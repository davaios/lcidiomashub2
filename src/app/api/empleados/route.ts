import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { hash } from "bcryptjs"

const empleadoCreateSchema = z.object({
  // User data
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Password debe tener al menos 8 caracteres"),
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellidos son requeridos"),
  phone: z.string().optional(),
  role: z.enum([
    "ADMIN",
    "DIRECTOR",
    "COORDINADOR_ACADEMICO",
    "PROFESOR",
    "COMERCIAL",
    "ADMINISTRATIVO",
    "ATENCION_CLIENTE",
    "IT",
    "RRHH",
  ]),

  // Empleado data
  sedeId: z.string().min(1, "Sede es requerida"),
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
  puesto: z.string().min(1, "Puesto es requerido"),
  tipoContrato: z.enum([
    "INDEFINIDO",
    "TEMPORAL",
    "PRACTICAS",
    "FORMACION",
    "AUTONOMO",
  ]),
  fechaAlta: z.string(),
  salarioBruto: z.number().positive("Salario debe ser positivo"),
  numSS: z.string().optional(),
})

// GET /api/empleados - List all employees
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const departamento = searchParams.get("departamento")
    const sedeId = searchParams.get("sedeId")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (departamento) where.departamento = departamento
    if (sedeId) where.sedeId = sedeId
    if (search) {
      where.OR = [
        { codigo: { contains: search, mode: "insensitive" } },
        { puesto: { contains: search, mode: "insensitive" } },
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }

    const [empleados, total] = await Promise.all([
      prisma.empleado.findMany({
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
              role: true,
              status: true,
            },
          },
          sede: {
            select: { nombre: true, codigo: true },
          },
          _count: {
            select: {
              leadsAsignados: true,
              ausencias: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.empleado.count({ where }),
    ])

    // Get department stats
    const departmentStats = await prisma.empleado.groupBy({
      by: ["departamento"],
      _count: { id: true },
    })

    return NextResponse.json({
      data: empleados,
      stats: {
        byDepartment: departmentStats.reduce((acc, d) => {
          acc[d.departamento] = d._count.id
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
    console.error("Error fetching empleados:", error)
    return NextResponse.json(
      { error: "Error al obtener empleados" },
      { status: 500 }
    )
  }
}

// POST /api/empleados - Create a new employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = empleadoCreateSchema.parse(body)

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

    // Generate empleado code
    const lastEmpleado = await prisma.empleado.findFirst({
      orderBy: { codigo: "desc" },
    })
    const nextNumber = lastEmpleado
      ? parseInt(lastEmpleado.codigo.replace("EMP-", "")) + 1
      : 1
    const codigo = `EMP-${String(nextNumber).padStart(3, "0")}`

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Create user and empleado in transaction
    const empleado = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          passwordHash,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: validatedData.role,
          sedeId: validatedData.sedeId,
        },
      })

      return tx.empleado.create({
        data: {
          userId: user.id,
          codigo,
          sedeId: validatedData.sedeId,
          departamento: validatedData.departamento,
          puesto: validatedData.puesto,
          tipoContrato: validatedData.tipoContrato,
          fechaAlta: new Date(validatedData.fechaAlta),
          salarioBruto: validatedData.salarioBruto,
          numSS: validatedData.numSS,
        },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
          sede: {
            select: { nombre: true },
          },
        },
      })
    })

    return NextResponse.json(empleado, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating empleado:", error)
    return NextResponse.json(
      { error: "Error al crear empleado" },
      { status: 500 }
    )
  }
}
