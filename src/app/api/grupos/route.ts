import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const grupoCreateSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  cursoId: z.string().min(1, "Curso es requerido"),
  sedeId: z.string().min(1, "Sede es requerida"),
  profesorId: z.string().optional(),
  tipo: z.enum([
    "REGULAR",
    "INTENSIVO",
    "EMPRESA",
    "EXTRAESCOLAR",
    "CAMPAMENTO",
    "PARTICULAR",
  ]),
  modalidad: z.enum(["PRESENCIAL", "ONLINE", "HIBRIDO"]),
  horaInicio: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora invalida"),
  horaFin: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora invalida"),
  diasSemana: z.array(z.number().int().min(0).max(6)).min(1, "Seleccione al menos un dia"),
  fechaInicio: z.string(),
  fechaFin: z.string(),
})

// GET /api/grupos - List all groups
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const estado = searchParams.get("estado")
    const sedeId = searchParams.get("sedeId")
    const idioma = searchParams.get("idioma")
    const profesorId = searchParams.get("profesorId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (sedeId) where.sedeId = sedeId
    if (profesorId) where.profesorId = profesorId
    if (idioma) where.curso = { idioma }

    const [grupos, total] = await Promise.all([
      prisma.grupo.findMany({
        where,
        include: {
          curso: {
            select: {
              codigo: true,
              nombre: true,
              idioma: true,
              nivel: true,
              maxAlumnos: true,
            },
          },
          sede: {
            select: { nombre: true, codigo: true },
          },
          profesor: {
            include: {
              user: {
                select: { firstName: true, lastName: true },
              },
            },
          },
          _count: {
            select: {
              alumnos: { where: { estado: "ACTIVO" } },
              clases: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.grupo.count({ where }),
    ])

    return NextResponse.json({
      data: grupos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching grupos:", error)
    return NextResponse.json(
      { error: "Error al obtener grupos" },
      { status: 500 }
    )
  }
}

// POST /api/grupos - Create a new group
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = grupoCreateSchema.parse(body)

    // Get course info for code generation
    const curso = await prisma.curso.findUnique({
      where: { id: validatedData.cursoId },
    })

    if (!curso) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 400 }
      )
    }

    // Generate grupo code
    const diasLabels = ["D", "L", "M", "X", "J", "V", "S"]
    const diasCodigo = validatedData.diasSemana.map(d => diasLabels[d]).join("")
    const lastGrupo = await prisma.grupo.findFirst({
      where: { codigo: { startsWith: `${curso.nivel}-${diasCodigo}` } },
      orderBy: { codigo: "desc" },
    })
    const nextNumber = lastGrupo
      ? parseInt(lastGrupo.codigo.split("-").pop() || "0") + 1
      : 1
    const codigo = `${curso.nivel}-${diasCodigo}-${String(nextNumber).padStart(3, "0")}`

    const grupo = await prisma.grupo.create({
      data: {
        codigo,
        nombre: validatedData.nombre,
        cursoId: validatedData.cursoId,
        sedeId: validatedData.sedeId,
        profesorId: validatedData.profesorId,
        tipo: validatedData.tipo,
        modalidad: validatedData.modalidad,
        horaInicio: validatedData.horaInicio,
        horaFin: validatedData.horaFin,
        diasSemana: validatedData.diasSemana,
        fechaInicio: new Date(validatedData.fechaInicio),
        fechaFin: new Date(validatedData.fechaFin),
        estado: "ABIERTO",
      },
      include: {
        curso: true,
        sede: true,
        profesor: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
    })

    return NextResponse.json(grupo, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating grupo:", error)
    return NextResponse.json(
      { error: "Error al crear grupo" },
      { status: 500 }
    )
  }
}
