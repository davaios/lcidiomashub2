import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Video,
} from "lucide-react"
import { getInitials, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Citas",
}

// Mock data - Citas de hoy y proximas
const citasHoy = [
  {
    id: "1",
    nombre: "Roberto Gonzalez Vera",
    email: "roberto.gonzalez@email.com",
    telefono: "+34 612 345 678",
    motivo: "TEST_NIVEL",
    descripcion: "Test de nivel para curso de ingles",
    fecha: "2026-01-03",
    hora: "10:00",
    duracion: 45,
    sede: "Centro",
    empleado: "Ana Garcia",
    estado: "CONFIRMADA",
    modalidad: "PRESENCIAL",
  },
  {
    id: "2",
    nombre: "Carmen Blazquez Luna",
    email: "carmen.blazquez@email.com",
    telefono: "+34 623 456 789",
    motivo: "INFORMACION",
    descripcion: "Informacion cursos empresa",
    fecha: "2026-01-03",
    hora: "11:30",
    duracion: 30,
    sede: "Centro",
    empleado: "Pedro Sanchez",
    estado: "CONFIRMADA",
    modalidad: "ONLINE",
  },
  {
    id: "3",
    nombre: "Fernando Reyes Soto",
    email: "fernando.reyes@email.com",
    telefono: "+34 634 567 890",
    motivo: "ENTREVISTA",
    descripcion: "Entrevista candidato profesor",
    fecha: "2026-01-03",
    hora: "13:00",
    duracion: 60,
    sede: "Centro",
    empleado: "Carlos Martinez",
    estado: "PENDIENTE",
    modalidad: "PRESENCIAL",
  },
  {
    id: "4",
    nombre: "Patricia Mendez Cruz",
    email: "patricia.mendez@email.com",
    telefono: "+34 645 678 901",
    motivo: "TUTORIA",
    descripcion: "Tutoria seguimiento alumno",
    fecha: "2026-01-03",
    hora: "16:00",
    duracion: 30,
    sede: "Norte",
    empleado: "Maria Garcia",
    estado: "CONFIRMADA",
    modalidad: "PRESENCIAL",
  },
]

const citasProximas = [
  {
    id: "5",
    nombre: "Jorge Castro Vega",
    email: "jorge.castro@email.com",
    telefono: "+34 656 789 012",
    motivo: "TEST_NIVEL",
    descripcion: "Test de nivel aleman",
    fecha: "2026-01-06",
    hora: "10:00",
    duracion: 45,
    sede: "Centro",
    empleado: "Ana Garcia",
    estado: "CONFIRMADA",
    modalidad: "PRESENCIAL",
  },
  {
    id: "6",
    nombre: "Isabel Ortega Ramos",
    email: "isabel.ortega@email.com",
    telefono: "+34 667 890 123",
    motivo: "INFORMACION",
    descripcion: "Informacion cursos ninos",
    fecha: "2026-01-06",
    hora: "12:00",
    duracion: 30,
    sede: "Sur",
    empleado: "Elena Martinez",
    estado: "PENDIENTE",
    modalidad: "PRESENCIAL",
  },
  {
    id: "7",
    nombre: "Manuel Guerrero Pena",
    email: "manuel.guerrero@email.com",
    telefono: "+34 678 901 234",
    motivo: "RECLAMACION",
    descripcion: "Revision facturacion",
    fecha: "2026-01-07",
    hora: "09:30",
    duracion: 30,
    sede: "Centro",
    empleado: "Roberto Gomez",
    estado: "CONFIRMADA",
    modalidad: "ONLINE",
  },
]

const motivoConfig: Record<string, { color: string; label: string }> = {
  INFORMACION: { color: "bg-blue-100 text-blue-800", label: "Informacion" },
  TEST_NIVEL: { color: "bg-purple-100 text-purple-800", label: "Test Nivel" },
  ENTREVISTA: { color: "bg-green-100 text-green-800", label: "Entrevista" },
  TUTORIA: { color: "bg-cyan-100 text-cyan-800", label: "Tutoria" },
  RECLAMACION: { color: "bg-red-100 text-red-800", label: "Reclamacion" },
  OTRO: { color: "bg-gray-100 text-gray-800", label: "Otro" },
}

const estadoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  PENDIENTE: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  CONFIRMADA: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  COMPLETADA: { color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  CANCELADA: { color: "bg-gray-100 text-gray-800", icon: XCircle },
  NO_SHOW: { color: "bg-red-100 text-red-800", icon: AlertCircle },
}

function CitaCard({ cita }: { cita: typeof citasHoy[0] }) {
  const EstadoIcon = estadoConfig[cita.estado]?.icon || Clock

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-center min-w-[60px]">
          <p className="text-2xl font-bold">{cita.hora}</p>
          <p className="text-xs text-muted-foreground">{cita.duracion} min</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{cita.nombre}</p>
            {cita.modalidad === "ONLINE" && (
              <Badge variant="outline" className="text-xs">
                <Video className="h-3 w-3 mr-1" />
                Online
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{cita.descripcion}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {cita.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {cita.telefono}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Sede {cita.sede}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Atiende:</span> {cita.empleado}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={motivoConfig[cita.motivo]?.color}>
          {motivoConfig[cita.motivo]?.label}
        </Badge>
        <Badge className={estadoConfig[cita.estado]?.color}>
          <EstadoIcon className="h-3 w-3 mr-1" />
          {cita.estado === "CONFIRMADA" ? "Confirmada" : cita.estado === "PENDIENTE" ? "Pendiente" : cita.estado}
        </Badge>
      </div>
    </div>
  )
}

export default function CitasPage() {
  // Stats
  const totalHoy = citasHoy.length
  const confirmadasHoy = citasHoy.filter(c => c.estado === "CONFIRMADA").length
  const pendientesHoy = citasHoy.filter(c => c.estado === "PENDIENTE").length
  const proximaSemana = citasProximas.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Citas</h1>
          <p className="text-muted-foreground">
            Agenda de citas y reuniones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalHoy}</div>
                <p className="text-sm text-muted-foreground">Citas Hoy</p>
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
                <div className="text-2xl font-bold">{confirmadasHoy}</div>
                <p className="text-sm text-muted-foreground">Confirmadas</p>
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
                <div className="text-2xl font-bold">{pendientesHoy}</div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{proximaSemana}</div>
                <p className="text-sm text-muted-foreground">Proxima Semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Citas de Hoy */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Citas de Hoy
              </CardTitle>
              <CardDescription>Viernes, 3 de Enero 2026</CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {citasHoy.length} citas
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {citasHoy.map((cita) => (
              <CitaCard key={cita.id} cita={cita} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Proximas Citas */}
      <Card>
        <CardHeader>
          <CardTitle>Proximas Citas</CardTitle>
          <CardDescription>Citas programadas para los proximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {citasProximas.map((cita) => (
              <div key={cita.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-[80px]">
                    <p className="text-sm font-medium">{formatDate(cita.fecha)}</p>
                    <p className="text-lg font-bold">{cita.hora}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{cita.nombre}</p>
                      {cita.modalidad === "ONLINE" && (
                        <Badge variant="outline" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{cita.descripcion}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Sede:</span> {cita.sede} |
                      <span className="font-medium"> Atiende:</span> {cita.empleado}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={motivoConfig[cita.motivo]?.color}>
                    {motivoConfig[cita.motivo]?.label}
                  </Badge>
                  <Badge className={estadoConfig[cita.estado]?.color}>
                    {cita.estado === "CONFIRMADA" ? "Confirmada" : "Pendiente"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
