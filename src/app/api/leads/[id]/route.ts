import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const leadUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  apellidos: z.string().min(1).optional(),
  email: z.string().email().optional(),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  estado: z.enum([
    "NUEVO",
    "CONTACTADO",
    "TEST_REALIZADO",
    "PROPUESTA_ENVIADA",
    "NEGOCIACION",
    "ACEPTADO",
    "MATRICULADO",
    "PERDIDO",
    "NO_CUALIFICADO",
  ]).optional(),
  temperatura: z.enum(["FRIO", "TIBIO", "CALIENTE", "MUY_CALIENTE"]).optional(),
  score: z.number().int().min(0).max(100).optional(),
  comercialId: z.string().optional(),
  idiomaInteres: z.string().optional(),
  horarioPreferido: z.string().optional(),
  objetivos: z.string().optional(),
  proximoContacto: z.string().datetime().optional(),
  notas: z.string().optional(),
})

// GET /api/leads/[id] - Get a single lead
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        comercial: {
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
        testNivel: true,
        interacciones: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        propuestas: {
          orderBy: { createdAt: "desc" },
        },
        tareas: {
          where: { completada: false },
          orderBy: { fechaVencimiento: "asc" },
        },
      },
    })

    if (!lead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error fetching lead:", error)
    return NextResponse.json(
      { error: "Error al obtener lead" },
      { status: 500 }
    )
  }
}

// PATCH /api/leads/[id] - Update a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = leadUpdateSchema.parse(body)

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404 }
      )
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...validatedData,
        proximoContacto: validatedData.proximoContacto
          ? new Date(validatedData.proximoContacto)
          : undefined,
      },
    })

    return NextResponse.json(lead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error updating lead:", error)
    return NextResponse.json(
      { error: "Error al actualizar lead" },
      { status: 500 }
    )
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: "Lead no encontrado" },
        { status: 404 }
      )
    }

    await prisma.lead.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Lead eliminado correctamente" })
  } catch (error) {
    console.error("Error deleting lead:", error)
    return NextResponse.json(
      { error: "Error al eliminar lead" },
      { status: 500 }
    )
  }
}
