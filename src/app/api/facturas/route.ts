import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const facturaCreateSchema = z.object({
  alumnoId: z.string().optional(),
  empresaId: z.string().optional(),
  matriculaId: z.string().optional(),
  sedeId: z.string().min(1, "Sede es requerida"),
  nombreFiscal: z.string().min(1, "Nombre fiscal es requerido"),
  nif: z.string().min(1, "NIF es requerido"),
  direccionFiscal: z.string().min(1, "Direccion fiscal es requerida"),
  lineas: z.array(z.object({
    descripcion: z.string().min(1),
    cantidad: z.number().int().positive(),
    precioUnit: z.number().positive(),
    descuento: z.number().min(0).max(100).default(0),
  })).min(1, "Debe incluir al menos una linea"),
  tipoIVA: z.number().default(21),
  fechaVencimiento: z.string(),
})

// GET /api/facturas - List all invoices
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const estado = searchParams.get("estado")
    const sedeId = searchParams.get("sedeId")
    const alumnoId = searchParams.get("alumnoId")
    const empresaId = searchParams.get("empresaId")
    const desde = searchParams.get("desde")
    const hasta = searchParams.get("hasta")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (sedeId) where.sedeId = sedeId
    if (alumnoId) where.alumnoId = alumnoId
    if (empresaId) where.empresaId = empresaId
    if (desde || hasta) {
      where.fechaEmision = {}
      if (desde) (where.fechaEmision as Record<string, unknown>).gte = new Date(desde)
      if (hasta) (where.fechaEmision as Record<string, unknown>).lte = new Date(hasta)
    }

    const [facturas, total, stats] = await Promise.all([
      prisma.factura.findMany({
        where,
        include: {
          alumno: {
            include: {
              user: {
                select: { firstName: true, lastName: true },
              },
            },
          },
          empresa: {
            select: { razonSocial: true },
          },
          sede: {
            select: { nombre: true },
          },
          lineas: true,
          _count: {
            select: { pagos: true },
          },
        },
        orderBy: { fechaEmision: "desc" },
        skip,
        take: limit,
      }),
      prisma.factura.count({ where }),
      prisma.factura.aggregate({
        where,
        _sum: {
          total: true,
          baseImponible: true,
          importeIVA: true,
        },
      }),
    ])

    return NextResponse.json({
      data: facturas,
      stats: {
        totalFacturado: stats._sum.total || 0,
        baseImponible: stats._sum.baseImponible || 0,
        totalIVA: stats._sum.importeIVA || 0,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching facturas:", error)
    return NextResponse.json(
      { error: "Error al obtener facturas" },
      { status: 500 }
    )
  }
}

// POST /api/facturas - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = facturaCreateSchema.parse(body)

    // Generate factura number
    const year = new Date().getFullYear()
    const serie = validatedData.empresaId ? "B" : "A"
    const lastFactura = await prisma.factura.findFirst({
      where: {
        serie,
        numero: { startsWith: `F-${year}` },
      },
      orderBy: { numero: "desc" },
    })
    const nextNumber = lastFactura
      ? parseInt(lastFactura.numero.split("-").pop() || "0") + 1
      : 1
    const numero = `F-${year}-${String(nextNumber).padStart(4, "0")}`

    // Calculate totals
    const lineasConImporte = validatedData.lineas.map(linea => {
      const subtotal = linea.cantidad * linea.precioUnit
      const descuentoAmount = subtotal * (linea.descuento / 100)
      const importe = subtotal - descuentoAmount
      return { ...linea, importe }
    })

    const baseImponible = lineasConImporte.reduce((acc, l) => acc + l.importe, 0)
    const importeIVA = baseImponible * (validatedData.tipoIVA / 100)
    const total = baseImponible + importeIVA

    const factura = await prisma.$transaction(async (tx) => {
      const newFactura = await tx.factura.create({
        data: {
          numero,
          serie,
          alumnoId: validatedData.alumnoId,
          empresaId: validatedData.empresaId,
          matriculaId: validatedData.matriculaId,
          sedeId: validatedData.sedeId,
          nombreFiscal: validatedData.nombreFiscal,
          nif: validatedData.nif,
          direccionFiscal: validatedData.direccionFiscal,
          baseImponible,
          tipoIVA: validatedData.tipoIVA,
          importeIVA,
          total,
          estado: "EMITIDA",
          fechaVencimiento: new Date(validatedData.fechaVencimiento),
        },
      })

      // Create line items
      await tx.lineaFactura.createMany({
        data: lineasConImporte.map(linea => ({
          facturaId: newFactura.id,
          descripcion: linea.descripcion,
          cantidad: linea.cantidad,
          precioUnit: linea.precioUnit,
          descuento: linea.descuento,
          importe: linea.importe,
        })),
      })

      return tx.factura.findUnique({
        where: { id: newFactura.id },
        include: { lineas: true },
      })
    })

    return NextResponse.json(factura, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating factura:", error)
    return NextResponse.json(
      { error: "Error al crear factura" },
      { status: 500 }
    )
  }
}
