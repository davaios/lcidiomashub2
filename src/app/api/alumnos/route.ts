import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { hash } from "bcryptjs"

const alumnoCreateSchema = z.object({
  // User data
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Password debe tener al menos 8 caracteres"),
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellidos son requeridos"),
  phone: z.string().optional(),
  sedeId: z.string(),

  // Alumno data
  nivelActual: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
  idiomasPrincipal: z.array(z.string()).default(["Ingles"]),
  fechaNacimiento: z.string().optional(),
  nacionalidad: z.string().optional(),
  documentoTipo: z.enum(["DNI", "NIE", "PASAPORTE", "OTRO"]).optional(),
  documentoNumero: z.string().optional(),
  esMenor: z.boolean().default(false),
  tutorNombre: z.string().optional(),
  tutorTelefono: z.string().optional(),
  tutorEmail: z.string().email().optional(),
  tutorRelacion: z.string().optional(),
})

// GET /api/alumnos - List all students
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const nivel = searchParams.get("nivel")
    const sedeId = searchParams.get("sedeId")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (nivel) where.nivelActual = nivel
    if (sedeId) where.user = { sedeId }
    if (search) {
      where.OR = [
        { codigo: { contains: search, mode: "insensitive" } },
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }

    const [alumnos, total] = await Promise.all([
      prisma.alumno.findMany({
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
          grupoAlumnos: {
            where: { estado: "ACTIVO" },
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
              asistencias: true,
              evaluaciones: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.alumno.count({ where }),
    ])

    return NextResponse.json({
      data: alumnos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching alumnos:", error)
    return NextResponse.json(
      { error: "Error al obtener alumnos" },
      { status: 500 }
    )
  }
}

// POST /api/alumnos - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = alumnoCreateSchema.parse(body)

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

    // Generate alumno code
    const lastAlumno = await prisma.alumno.findFirst({
      orderBy: { codigo: "desc" },
    })
    const nextNumber = lastAlumno
      ? parseInt(lastAlumno.codigo.replace("ALU-", "")) + 1
      : 1
    const codigo = `ALU-${String(nextNumber).padStart(4, "0")}`

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Create user and alumno in transaction
    const alumno = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          passwordHash,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: "ALUMNO",
          sedeId: validatedData.sedeId,
        },
      })

      return tx.alumno.create({
        data: {
          userId: user.id,
          codigo,
          nivelActual: validatedData.nivelActual,
          idiomasPrincipal: validatedData.idiomasPrincipal,
          fechaNacimiento: validatedData.fechaNacimiento
            ? new Date(validatedData.fechaNacimiento)
            : undefined,
          nacionalidad: validatedData.nacionalidad,
          documentoTipo: validatedData.documentoTipo,
          documentoNumero: validatedData.documentoNumero,
          esMenor: validatedData.esMenor,
          tutorNombre: validatedData.tutorNombre,
          tutorTelefono: validatedData.tutorTelefono,
          tutorEmail: validatedData.tutorEmail,
          tutorRelacion: validatedData.tutorRelacion,
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

    return NextResponse.json(alumno, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating alumno:", error)
    return NextResponse.json(
      { error: "Error al crear alumno" },
      { status: 500 }
    )
  }
}
