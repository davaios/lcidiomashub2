import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Building,
  Mail,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { getInitials, formatDateTime } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Tickets",
}

// Mock data
const tickets = [
  {
    id: "1",
    codigo: "TK-2026-0001",
    solicitante: "Carlos Rodriguez Martinez",
    tipo: "ALUMNO",
    email: "carlos.rodriguez@email.com",
    asunto: "Problema con acceso a plataforma online",
    categoria: "INCIDENCIA_TECNICA",
    prioridad: "ALTA",
    departamento: "IT",
    estado: "EN_PROGRESO",
    fechaCreacion: "2026-01-02T10:30:00",
    mensajes: 3,
  },
  {
    id: "2",
    codigo: "TK-2026-0002",
    solicitante: "Ana Lopez Fernandez",
    tipo: "ALUMNO",
    email: "ana.lopez@email.com",
    asunto: "Solicitud cambio de horario",
    categoria: "HORARIOS",
    prioridad: "MEDIA",
    departamento: "ACADEMICO",
    estado: "ABIERTO",
    fechaCreacion: "2026-01-02T14:15:00",
    mensajes: 1,
  },
  {
    id: "3",
    codigo: "TK-2026-0003",
    solicitante: "Tech Solutions SL",
    tipo: "EMPRESA",
    email: "rrhh@techsolutions.com",
    asunto: "Consulta sobre facturacion FUNDAE",
    categoria: "FACTURACION",
    prioridad: "MEDIA",
    departamento: "ADMINISTRACION",
    estado: "PENDIENTE_CLIENTE",
    fechaCreacion: "2026-01-02T09:00:00",
    mensajes: 5,
  },
  {
    id: "4",
    codigo: "TK-2026-0004",
    solicitante: "Miguel Garcia Perez",
    tipo: "ALUMNO",
    email: "miguel.garcia@email.com",
    asunto: "Solicitud de baja temporal",
    categoria: "BAJA",
    prioridad: "ALTA",
    departamento: "ATENCION_CLIENTE",
    estado: "PENDIENTE_INTERNO",
    fechaCreacion: "2026-01-03T08:45:00",
    mensajes: 2,
  },
  {
    id: "5",
    codigo: "TK-2026-0005",
    solicitante: "Laura Martinez Ruiz",
    tipo: "ALUMNO",
    email: "laura.martinez@email.com",
    asunto: "Sugerencia de mejora para clases online",
    categoria: "SUGERENCIA",
    prioridad: "BAJA",
    departamento: "ACADEMICO",
    estado: "RESUELTO",
    fechaCreacion: "2025-12-28T11:20:00",
    mensajes: 4,
  },
  {
    id: "6",
    codigo: "TK-2026-0006",
    solicitante: "Elena Fernandez Torres",
    tipo: "FAMILIAR",
    email: "elena.fernandez.parent@email.com",
    asunto: "Consulta sobre progreso de mi hijo",
    categoria: "ACADEMICO",
    prioridad: "MEDIA",
    departamento: "ACADEMICO",
    estado: "CERRADO",
    fechaCreacion: "2025-12-27T16:30:00",
    mensajes: 6,
  },
  {
    id: "7",
    codigo: "TK-2026-0007",
    solicitante: "David Sanchez Gomez",
    tipo: "ALUMNO",
    email: "david.sanchez@email.com",
    asunto: "Error en factura recibida",
    categoria: "FACTURACION",
    prioridad: "ALTA",
    departamento: "ADMINISTRACION",
    estado: "EN_PROGRESO",
    fechaCreacion: "2026-01-03T09:15:00",
    mensajes: 2,
  },
]

const categoriaConfig: Record<string, { color: string; label: string }> = {
  ACADEMICO: { color: "bg-blue-100 text-blue-800", label: "Academico" },
  FACTURACION: { color: "bg-green-100 text-green-800", label: "Facturacion" },
  HORARIOS: { color: "bg-purple-100 text-purple-800", label: "Horarios" },
  INCIDENCIA_TECNICA: { color: "bg-red-100 text-red-800", label: "Incidencia Tecnica" },
  QUEJA: { color: "bg-orange-100 text-orange-800", label: "Queja" },
  SUGERENCIA: { color: "bg-cyan-100 text-cyan-800", label: "Sugerencia" },
  INFORMACION: { color: "bg-gray-100 text-gray-800", label: "Informacion" },
  BAJA: { color: "bg-yellow-100 text-yellow-800", label: "Baja" },
  OTRO: { color: "bg-gray-100 text-gray-800", label: "Otro" },
}

const estadoConfig: Record<string, { color: string; label: string }> = {
  ABIERTO: { color: "bg-blue-100 text-blue-800", label: "Abierto" },
  EN_PROGRESO: { color: "bg-yellow-100 text-yellow-800", label: "En Progreso" },
  PENDIENTE_CLIENTE: { color: "bg-purple-100 text-purple-800", label: "Pend. Cliente" },
  PENDIENTE_INTERNO: { color: "bg-orange-100 text-orange-800", label: "Pend. Interno" },
  RESUELTO: { color: "bg-green-100 text-green-800", label: "Resuelto" },
  CERRADO: { color: "bg-gray-100 text-gray-800", label: "Cerrado" },
}

const prioridadConfig: Record<string, { color: string; label: string }> = {
  BAJA: { color: "text-gray-600", label: "Baja" },
  MEDIA: { color: "text-yellow-600", label: "Media" },
  ALTA: { color: "text-orange-600", label: "Alta" },
  URGENTE: { color: "text-red-600", label: "Urgente" },
}

export default function TicketsPage() {
  // Stats
  const abiertos = tickets.filter(t => t.estado === "ABIERTO").length
  const enProgreso = tickets.filter(t => t.estado === "EN_PROGRESO").length
  const pendientes = tickets.filter(t => t.estado.startsWith("PENDIENTE")).length
  const resueltos = tickets.filter(t => ["RESUELTO", "CERRADO"].includes(t.estado)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-muted-foreground">
            Gestion de incidencias y solicitudes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{abiertos}</div>
                <p className="text-sm text-muted-foreground">Abiertos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{enProgreso}</div>
                <p className="text-sm text-muted-foreground">En Progreso</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendientes}</div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{resueltos}</div>
                <p className="text-sm text-muted-foreground">Resueltos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Tickets</CardTitle>
          <CardDescription>{tickets.length} tickets registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={
                      ticket.tipo === "EMPRESA"
                        ? "bg-purple-100 text-purple-800"
                        : ticket.tipo === "FAMILIAR"
                        ? "bg-pink-100 text-pink-800"
                        : "bg-primary text-primary-foreground"
                    }>
                      {ticket.tipo === "EMPRESA" ? (
                        <Building className="h-5 w-5" />
                      ) : (
                        getInitials(ticket.solicitante.split(" ")[0], ticket.solicitante.split(" ")[1] || "")
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{ticket.codigo}</p>
                      <span className={`text-xs font-medium ${prioridadConfig[ticket.prioridad]?.color}`}>
                        {prioridadConfig[ticket.prioridad]?.label}
                      </span>
                    </div>
                    <p className="font-medium">{ticket.asunto}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {ticket.tipo === "EMPRESA" ? <Building className="h-3 w-3" /> : <User className="h-3 w-3" />}
                        {ticket.solicitante}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateTime(ticket.fechaCreacion)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {ticket.mensajes} mensajes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={categoriaConfig[ticket.categoria]?.color}>
                    {categoriaConfig[ticket.categoria]?.label}
                  </Badge>
                  <Badge className={estadoConfig[ticket.estado]?.color}>
                    {estadoConfig[ticket.estado]?.label}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
