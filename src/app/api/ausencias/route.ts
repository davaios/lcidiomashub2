import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const ausenciaCreateSchema = z.object({
  empleadoId: z.string().min(1, "Empleado es requerido"),
  tipo: z.enum([
    "VACACIONES",
    "BAJA_MEDICA",
    "PERMISO_RETRIBUIDO",
    "PERMISO_NO_RETRIBUIDO",
    "ASUNTOS_PROPIOS",
    "OTRO",
  ]),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  motivo: z.string().optional(),
  documentoUrl: z.string().optional(),
})

// GET /api/ausencias - List all absences
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const estado = searchParams.get("estado")
    const tipo = searchParams.get("tipo")
    const empleadoId = searchParams.get("empleadoId")
    const desde = searchParams.get("desde")
    const hasta = searchParams.get("hasta")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (tipo) where.tipo = tipo
    if (empleadoId) where.empleadoId = empleadoId
    if (desde || hasta) {
      where.fechaInicio = {}
      if (desde) (where.fechaInicio as Record<string, unknown>).gte = new Date(desde)
      if (hasta) (where.fechaInicio as Record<string, unknown>).lte = new Date(hasta)
    }

    const [ausencias, total, stats] = await Promise.all([
      prisma.ausencia.findMany({
        where,
        include: {
          empleado: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { fechaInicio: "desc" },
        skip,
        take: limit,
      }),
      prisma.ausencia.count({ where }),
      prisma.ausencia.groupBy({
        by: ["tipo", "estado"],
        _count: { id: true },
        _sum: { dias: true },
      }),
    ])

    // Calculate stats
    const diasPorTipo = stats.reduce((acc, s) => {
      if (!acc[s.tipo]) acc[s.tipo] = 0
      acc[s.tipo] += s._sum.dias || 0
      return acc
    }, {} as Record<string, number>)

    const pendientes = stats
      .filter((s) => s.estado === "PENDIENTE")
      .reduce((acc, s) => acc + s._count.id, 0)

    return NextResponse.json({
      data: ausencias,
      stats: {
        diasPorTipo,
        pendientes,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching ausencias:", error)
    return NextResponse.json(
      { error: "Error al obtener ausencias" },
      { status: 500 }
    )
  }
}

// POST /api/ausencias - Create a new absence request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ausenciaCreateSchema.parse(body)

    const fechaInicio = new Date(validatedData.fechaInicio)
    const fechaFin = new Date(validatedData.fechaFin)

    // Calculate business days
    let dias = 0
    const current = new Date(fechaInicio)
    while (current <= fechaFin) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dias++
      }
      current.setDate(current.getDate() + 1)
    }

    // Check for overlapping absences
    const existing = await prisma.ausencia.findFirst({
      where: {
        empleadoId: validatedData.empleadoId,
        estado: { not: "CANCELADA" },
        OR: [
          {
            fechaInicio: { lte: fechaFin },
            fechaFin: { gte: fechaInicio },
          },
        ],
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una ausencia registrada en ese periodo" },
        { status: 400 }
      )
    }

    const ausencia = await prisma.ausencia.create({
      data: {
        empleadoId: validatedData.empleadoId,
        tipo: validatedData.tipo,
        fechaInicio,
        fechaFin,
        dias,
        motivo: validatedData.motivo,
        documentoUrl: validatedData.documentoUrl,
        estado: "PENDIENTE",
      },
      include: {
        empleado: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(ausencia, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating ausencia:", error)
    return NextResponse.json(
      { error: "Error al crear ausencia" },
      { status: 500 }
    )
  }
}

// PATCH /api/ausencias - Approve/Reject absence (bulk action)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { ids, action, aprobadoPor } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "IDs son requeridos" },
        { status: 400 }
      )
    }

    if (!["aprobar", "rechazar"].includes(action)) {
      return NextResponse.json(
        { error: "Accion invalida" },
        { status: 400 }
      )
    }

    const estado = action === "aprobar" ? "APROBADA" : "RECHAZADA"

    const updated = await prisma.ausencia.updateMany({
      where: {
        id: { in: ids },
        estado: "PENDIENTE",
      },
      data: {
        estado,
        aprobadaPor,
      },
    })

    return NextResponse.json({
      message: `${updated.count} ausencia(s) ${action === "aprobar" ? "aprobada(s)" : "rechazada(s)"}`,
      count: updated.count,
    })
  } catch (error) {
    console.error("Error updating ausencias:", error)
    return NextResponse.json(
      { error: "Error al actualizar ausencias" },
      { status: 500 }
    )
  }
}
