import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const cursoCreateSchema = z.object({
  codigo: z.string().min(1, "Codigo es requerido"),
  nombre: z.string().min(1, "Nombre es requerido"),
  descripcion: z.string().optional(),
  idioma: z.string().min(1, "Idioma es requerido"),
  nivel: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  modalidad: z.enum(["PRESENCIAL", "ONLINE", "HIBRIDO"]),
  duracionHoras: z.number().min(1),
  horasPorSemana: z.number().min(1),
  precioParticular: z.number().min(0),
  precioEmpresa: z.number().min(0).optional(),
  maxAlumnos: z.number().min(1).default(12),
  minAlumnos: z.number().min(1).default(3),
  materialIncluido: z.boolean().default(false),
  certificadoFinal: z.boolean().default(true),
})

// GET /api/cursos - List all courses
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const idioma = searchParams.get("idioma")
    const nivel = searchParams.get("nivel")
    const modalidad = searchParams.get("modalidad")
    const activo = searchParams.get("activo")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (idioma) where.idioma = idioma
    if (nivel) where.nivel = nivel
    if (modalidad) where.modalidad = modalidad
    if (activo !== null) where.activo = activo === "true"
    if (search) {
      where.OR = [
        { codigo: { contains: search, mode: "insensitive" } },
        { nombre: { contains: search, mode: "insensitive" } },
        { descripcion: { contains: search, mode: "insensitive" } },
      ]
    }

    const [cursos, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        include: {
          _count: {
            select: {
              grupos: true,
            },
          },
        },
        orderBy: [{ idioma: "asc" }, { nivel: "asc" }],
        skip,
        take: limit,
      }),
      prisma.curso.count({ where }),
    ])

    return NextResponse.json({
      data: cursos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching cursos:", error)
    return NextResponse.json(
      { error: "Error al obtener cursos" },
      { status: 500 }
    )
  }
}

// POST /api/cursos - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = cursoCreateSchema.parse(body)

    // Check if codigo already exists
    const existingCurso = await prisma.curso.findUnique({
      where: { codigo: validatedData.codigo },
    })

    if (existingCurso) {
      return NextResponse.json(
        { error: "El codigo de curso ya existe" },
        { status: 400 }
      )
    }

    const curso = await prisma.curso.create({
      data: validatedData,
    })

    return NextResponse.json(curso, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating curso:", error)
    return NextResponse.json(
      { error: "Error al crear curso" },
      { status: 500 }
    )
  }
}
