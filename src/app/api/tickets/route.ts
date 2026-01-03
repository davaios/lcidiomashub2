import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const ticketCreateSchema = z.object({
  tipo: z.enum(["ALUMNO", "FAMILIAR", "EMPRESA", "LEAD", "ANONIMO"]),
  alumnoId: z.string().optional(),
  empresaId: z.string().optional(),
  email: z.string().email("Email invalido"),
  telefono: z.string().optional(),
  asunto: z.string().min(1, "Asunto es requerido"),
  descripcion: z.string().min(1, "Descripcion es requerida"),
  categoria: z.enum([
    "ACADEMICO",
    "FACTURACION",
    "HORARIOS",
    "INCIDENCIA_TECNICA",
    "QUEJA",
    "SUGERENCIA",
    "INFORMACION",
    "BAJA",
    "OTRO",
  ]),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA", "URGENTE"]).default("MEDIA"),
  departamento: z.enum([
    "DIRECCION",
    "ACADEMICO",
    "COMERCIAL",
    "ADMINISTRACION",
    "ATENCION_CLIENTE",
    "IT",
    "RRHH",
    "OPERACIONES",
    "CALIDAD",
  ]),
})

// GET /api/tickets - List all tickets
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const estado = searchParams.get("estado")
    const categoria = searchParams.get("categoria")
    const departamento = searchParams.get("departamento")
    const prioridad = searchParams.get("prioridad")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (categoria) where.categoria = categoria
    if (departamento) where.departamento = departamento
    if (prioridad) where.prioridad = prioridad

    const [tickets, total, stats] = await Promise.all([
      prisma.ticket.findMany({
        where,
        include: {
          mensajes: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: { mensajes: true },
          },
        },
        orderBy: [
          { prioridad: "desc" },
          { createdAt: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.ticket.count({ where }),
      prisma.ticket.groupBy({
        by: ["estado"],
        _count: { id: true },
      }),
    ])

    return NextResponse.json({
      data: tickets,
      stats: {
        byStatus: stats.reduce((acc, s) => {
          acc[s.estado] = s._count.id
          return acc
        }, {} as Record<string, number>),
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json(
      { error: "Error al obtener tickets" },
      { status: 500 }
    )
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ticketCreateSchema.parse(body)

    // Generate ticket code
    const year = new Date().getFullYear()
    const lastTicket = await prisma.ticket.findFirst({
      where: { codigo: { startsWith: `TK-${year}` } },
      orderBy: { codigo: "desc" },
    })
    const nextNumber = lastTicket
      ? parseInt(lastTicket.codigo.split("-").pop() || "0") + 1
      : 1
    const codigo = `TK-${year}-${String(nextNumber).padStart(4, "0")}`

    const ticket = await prisma.ticket.create({
      data: {
        codigo,
        ...validatedData,
        estado: "ABIERTO",
      },
      include: {
        _count: {
          select: { mensajes: true },
        },
      },
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating ticket:", error)
    return NextResponse.json(
      { error: "Error al crear ticket" },
      { status: 500 }
    )
  }
}
