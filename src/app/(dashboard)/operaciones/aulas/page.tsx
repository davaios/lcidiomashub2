import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  DoorOpen,
  Users,
  Monitor,
  Tv,
  Wifi,
  Calendar,
  Clock,
  Building,
  Settings,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Aulas",
}

// Mock data
const aulas = [
  {
    id: "1",
    codigo: "A1",
    nombre: "Aula 1",
    sede: "Centro",
    capacidad: 12,
    tipo: "STANDARD",
    equipamiento: ["Pizarra", "Proyector", "Wifi"],
    ocupacion: [
      { dia: "Lunes", horas: ["09:00-10:30", "11:00-12:30", "18:00-19:30"] },
      { dia: "Martes", horas: ["10:00-11:30", "18:00-19:30", "20:00-21:30"] },
      { dia: "Miercoles", horas: ["09:00-10:30", "11:00-12:30"] },
    ],
    activa: true,
  },
  {
    id: "2",
    codigo: "A2",
    nombre: "Aula 2",
    sede: "Centro",
    capacidad: 10,
    tipo: "STANDARD",
    equipamiento: ["Pizarra", "Proyector", "Wifi"],
    ocupacion: [
      { dia: "Lunes", horas: ["10:00-11:30", "17:00-18:30"] },
      { dia: "Jueves", horas: ["18:00-19:30", "20:00-21:30"] },
    ],
    activa: true,
  },
  {
    id: "3",
    codigo: "A3",
    nombre: "Aula 3",
    sede: "Centro",
    capacidad: 8,
    tipo: "STANDARD",
    equipamiento: ["Pizarra", "Wifi"],
    ocupacion: [
      { dia: "Viernes", horas: ["17:00-18:30", "19:00-20:30"] },
      { dia: "Sabado", horas: ["10:00-12:00", "12:30-14:30"] },
    ],
    activa: true,
  },
  {
    id: "4",
    codigo: "AM1",
    nombre: "Aula Multimedia",
    sede: "Centro",
    capacidad: 15,
    tipo: "MULTIMEDIA",
    equipamiento: ["Pizarra Digital", "Proyector 4K", "Ordenadores", "Wifi", "Audio"],
    ocupacion: [
      { dia: "Martes", horas: ["09:00-11:00"] },
      { dia: "Jueves", horas: ["09:00-11:00", "16:00-18:00"] },
    ],
    activa: true,
  },
  {
    id: "5",
    codigo: "LAB1",
    nombre: "Laboratorio",
    sede: "Norte",
    capacidad: 8,
    tipo: "LABORATORIO",
    equipamiento: ["Ordenadores", "Auriculares", "Software idiomas", "Wifi"],
    ocupacion: [
      { dia: "Lunes", horas: ["10:00-12:00", "16:00-18:00"] },
      { dia: "Miercoles", horas: ["10:00-12:00"] },
    ],
    activa: true,
  },
  {
    id: "6",
    codigo: "SR1",
    nombre: "Sala Reuniones",
    sede: "Centro",
    capacidad: 6,
    tipo: "SALA_REUNIONES",
    equipamiento: ["TV", "Videoconferencia", "Wifi", "Pizarra"],
    ocupacion: [],
    activa: true,
  },
]

const tipoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  STANDARD: { color: "bg-blue-100 text-blue-800", icon: DoorOpen, label: "Standard" },
  MULTIMEDIA: { color: "bg-purple-100 text-purple-800", icon: Monitor, label: "Multimedia" },
  LABORATORIO: { color: "bg-green-100 text-green-800", icon: Tv, label: "Laboratorio" },
  SALA_REUNIONES: { color: "bg-orange-100 text-orange-800", icon: Users, label: "Sala Reuniones" },
  SALA_EXAMENES: { color: "bg-red-100 text-red-800", icon: DoorOpen, label: "Sala Examenes" },
}

const equipamientoIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi: Wifi,
  Proyector: Tv,
  "Proyector 4K": Tv,
  TV: Monitor,
  Ordenadores: Monitor,
}

export default function AulasPage() {
  // Stats
  const totalAulas = aulas.length
  const capacidadTotal = aulas.reduce((acc, a) => acc + a.capacidad, 0)
  const aulasMultimedia = aulas.filter(a => a.tipo === "MULTIMEDIA" || a.tipo === "LABORATORIO").length
  const sedes = [...new Set(aulas.map(a => a.sede))].length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Aulas</h1>
          <p className="text-muted-foreground">
            Gestion de espacios y reservas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Ver Calendario
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Aula
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <DoorOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalAulas}</div>
                <p className="text-sm text-muted-foreground">Total Aulas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{capacidadTotal}</div>
                <p className="text-sm text-muted-foreground">Capacidad Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Monitor className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{aulasMultimedia}</div>
                <p className="text-sm text-muted-foreground">Multimedia/Lab</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <Building className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{sedes}</div>
                <p className="text-sm text-muted-foreground">Sedes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aulas Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {aulas.map((aula) => {
          const TipoIcon = tipoConfig[aula.tipo]?.icon || DoorOpen
          const ocupacionHoy = aula.ocupacion.find(o => o.dia === "Viernes")?.horas.length || 0

          return (
            <Card key={aula.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${tipoConfig[aula.tipo]?.color.replace("text-", "bg-").split(" ")[0]}`}>
                      <TipoIcon className={`h-5 w-5 ${tipoConfig[aula.tipo]?.color.split(" ")[1]}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{aula.nombre}</CardTitle>
                      <CardDescription>{aula.codigo} - Sede {aula.sede}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Tipo y Capacidad */}
                  <div className="flex items-center justify-between">
                    <Badge className={tipoConfig[aula.tipo]?.color}>
                      {tipoConfig[aula.tipo]?.label}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{aula.capacidad} plazas</span>
                    </div>
                  </div>

                  {/* Equipamiento */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Equipamiento:</p>
                    <div className="flex flex-wrap gap-1">
                      {aula.equipamiento.map((eq, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Ocupacion */}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Hoy:
                      </span>
                      <span className={ocupacionHoy > 0 ? "font-medium" : "text-muted-foreground"}>
                        {ocupacionHoy > 0 ? `${ocupacionHoy} clases programadas` : "Sin clases"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="mr-1 h-3 w-3" />
                      Horario
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="mr-1 h-3 w-3" />
                      Reservar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
