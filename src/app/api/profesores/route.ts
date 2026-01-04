import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { hash } from "bcryptjs"

const profesorCreateSchema = z.object({
  // User data
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Password debe tener al menos 8 caracteres"),
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellidos son requeridos"),
  phone: z.string().optional(),
  sedeId: z.string(),

  // Profesor data
  idiomasNativos: z.array(z.string()).min(1, "Al menos un idioma nativo"),
  idiomasImparte: z.array(z.string()).min(1, "Al menos un idioma a impartir"),
  nivelesImparte: z.array(z.enum(["A1", "A2", "B1", "B2", "C1", "C2"])),
  especialidades: z.array(z.string()).optional(),
  tipoContrato: z.enum(["FIJO", "TEMPORAL", "COLABORADOR", "AUTONOMO"]),
  horasContratadas: z.number().min(0).optional(),
  tarifaHora: z.number().min(0).optional(),
  formacionAcademica: z.string().optional(),
  experienciaAnios: z.number().min(0).optional(),
  certificaciones: z.array(z.string()).optional(),
})

// GET /api/profesores - List all professors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const idioma = searchParams.get("idioma")
    const nivel = searchParams.get("nivel")
    const estado = searchParams.get("estado")
    const sedeId = searchParams.get("sedeId")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (sedeId) where.user = { sedeId }
    if (idioma) where.idiomasImparte = { has: idioma }
    if (nivel) where.nivelesImparte = { has: nivel }
    if (search) {
      where.OR = [
        { codigo: { contains: search, mode: "insensitive" } },
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }

    const [profesores, total] = await Promise.all([
      prisma.profesor.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              avatar: true,
              sede: {
                select: { nombre: true },
              },
            },
          },
          gruposProfesores: {
            where: {
              grupo: { estado: { in: ["ACTIVO", "EN_PROGRESO"] } },
            },
            include: {
              grupo: {
                select: {
                  codigo: true,
                  nombre: true,
                  curso: {
                    select: { idioma: true, nivel: true },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              evaluacionesCreadas: true,
              gruposProfesores: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.profesor.count({ where }),
    ])

    return NextResponse.json({
      data: profesores,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching profesores:", error)
    return NextResponse.json(
      { error: "Error al obtener profesores" },
      { status: 500 }
    )
  }
}

// POST /api/profesores - Create a new professor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = profesorCreateSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya esta registrado" },
        { status: 400 }
      )
    }

    // Generate profesor code
    const lastProfesor = await prisma.profesor.findFirst({
      orderBy: { codigo: "desc" },
    })
    const nextNumber = lastProfesor
      ? parseInt(lastProfesor.codigo.replace("PROF-", "")) + 1
      : 1
    const codigo = `PROF-${String(nextNumber).padStart(4, "0")}`

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Create user and profesor in transaction
    const profesor = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          passwordHash,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: "PROFESOR",
          sedeId: validatedData.sedeId,
        },
      })

      return tx.profesor.create({
        data: {
          userId: user.id,
          codigo,
          idiomasNativos: validatedData.idiomasNativos,
          idiomasImparte: validatedData.idiomasImparte,
          nivelesImparte: validatedData.nivelesImparte,
          especialidades: validatedData.especialidades || [],
          tipoContrato: validatedData.tipoContrato,
          horasContratadas: validatedData.horasContratadas,
          tarifaHora: validatedData.tarifaHora,
          formacionAcademica: validatedData.formacionAcademica,
          experienciaAnios: validatedData.experienciaAnios,
          certificaciones: validatedData.certificaciones || [],
        },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      })
    })

    return NextResponse.json(profesor, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating profesor:", error)
    return NextResponse.json(
      { error: "Error al crear profesor" },
      { status: 500 }
    )
  }
}
