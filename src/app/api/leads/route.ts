import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const leadCreateSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  apellidos: z.string().min(1, "Apellidos son requeridos"),
  email: z.string().email("Email invalido"),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  segmento: z.enum([
    "ADULTO_PARTICULAR",
    "NINO_PARTICULAR",
    "EMPRESA",
    "COLEGIO",
    "ERASMUS",
    "CAMPAMENTO",
  ]),
  origen: z.enum([
    "WEB_ORGANICO",
    "GOOGLE_ADS",
    "META_ADS",
    "REFERIDO",
    "LLAMADA_ENTRANTE",
    "VISITA_PRESENCIAL",
    "EVENTO",
    "COLEGIO",
    "EMPRESA",
    "OTRO",
  ]),
  idiomaInteres: z.string().optional(),
  horarioPreferido: z.string().optional(),
  objetivos: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

// GET /api/leads - List all leads with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const estado = searchParams.get("estado")
    const segmento = searchParams.get("segmento")
    const comercialId = searchParams.get("comercialId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (segmento) where.segmento = segmento
    if (comercialId) where.comercialId = comercialId

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          comercial: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          testNivel: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json(
      { error: "Error al obtener leads" },
      { status: 500 }
    )
  }
}

// POST /api/leads - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leadCreateSchema.parse(body)

    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        estado: "NUEVO",
        temperatura: "FRIO",
        score: 10,
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating lead:", error)
    return NextResponse.json(
      { error: "Error al crear lead" },
      { status: 500 }
    )
  }
}
