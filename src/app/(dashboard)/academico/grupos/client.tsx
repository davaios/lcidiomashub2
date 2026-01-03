"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Users,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Monitor,
  Building,
  Video,
} from "lucide-react"
import { getInitials } from "@/lib/utils"

interface Grupo {
  id: string
  codigo: string
  nombre: string
  curso: string
  idioma: string
  nivel: string
  profesor: string
  sede: string
  aula: string
  tipo: string
  modalidad: string
  horario: string
  diasSemana: string[]
  fechaInicio: string
  fechaFin: string
  estado: string
  plazasMax: number
  plazasOcupadas: number
  asistenciaMedia: number
}

const nivelColors: Record<string, string> = {
  A1: "bg-green-100 text-green-800",
  A2: "bg-green-200 text-green-800",
  B1: "bg-blue-100 text-blue-800",
  B2: "bg-blue-200 text-blue-800",
  C1: "bg-purple-100 text-purple-800",
  C2: "bg-purple-200 text-purple-800",
}

const tipoIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  REGULAR: BookOpen,
  INTENSIVO: Clock,
  EMPRESA: Building,
  EXTRAESCOLAR: Users,
  CAMPAMENTO: Calendar,
  PARTICULAR: Users,
}

const modalidadIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PRESENCIAL: MapPin,
  ONLINE: Video,
  HIBRIDO: Monitor,
}

function GrupoCard({ grupo }: { grupo: Grupo }) {
  const TipoIcon = tipoIcons[grupo.tipo] || BookOpen
  const ModalidadIcon = modalidadIcons[grupo.modalidad] || MapPin
  const ocupacion = Math.round((grupo.plazasOcupadas / grupo.plazasMax) * 100)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className={nivelColors[grupo.nivel]}>{grupo.nivel}</Badge>
              <Badge variant="outline">{grupo.idioma}</Badge>
            </div>
            <CardTitle className="text-lg">{grupo.codigo}</CardTitle>
            <CardDescription className="text-sm">{grupo.nombre}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Ver alumnos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Ver clases
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Profesor */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(grupo.profesor.split(" ")[0], grupo.profesor.split(" ")[1] || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{grupo.profesor}</p>
            <p className="text-xs text-muted-foreground">Profesor</p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{grupo.horario}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{grupo.diasSemana.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{grupo.sede}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ModalidadIcon className="h-4 w-4" />
            <span>{grupo.modalidad}</span>
          </div>
        </div>

        {/* Ocupacion */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ocupacion</span>
            <span className="font-medium">
              {grupo.plazasOcupadas}/{grupo.plazasMax}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full ${
                ocupacion >= 90
                  ? "bg-red-500"
                  : ocupacion >= 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${ocupacion}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between pt-2 border-t">
          <div className="text-center">
            <p className="text-lg font-bold">{grupo.asistenciaMedia}%</p>
            <p className="text-xs text-muted-foreground">Asistencia</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{grupo.plazasMax - grupo.plazasOcupadas}</p>
            <p className="text-xs text-muted-foreground">Plazas Libres</p>
          </div>
          <div className="text-center">
            <Badge
              variant={grupo.estado === "EN_CURSO" ? "default" : "secondary"}
              className="mt-1"
            >
              {grupo.estado === "EN_CURSO" ? "En Curso" : grupo.estado}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function GruposClient({ grupos }: { grupos: Grupo[] }) {
  const [selectedIdioma, setSelectedIdioma] = useState<string | null>(null)
  const [selectedSede, setSelectedSede] = useState<string | null>(null)

  const idiomas = [...new Set(grupos.map((g) => g.idioma))]
  const sedes = [...new Set(grupos.map((g) => g.sede))]

  const filteredGrupos = grupos.filter((g) => {
    if (selectedIdioma && g.idioma !== selectedIdioma) return false
    if (selectedSede && g.sede !== selectedSede) return false
    return true
  })

  // Stats
  const totalAlumnos = grupos.reduce((acc, g) => acc + g.plazasOcupadas, 0)
  const totalPlazas = grupos.reduce((acc, g) => acc + g.plazasMax, 0)
  const ocupacionMedia = Math.round((totalAlumnos / totalPlazas) * 100)
  const gruposActivos = grupos.filter((g) => g.estado === "EN_CURSO").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Grupos</h1>
          <p className="text-muted-foreground">
            Gestiona todos los grupos y clases
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Grupo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{gruposActivos}</div>
                <p className="text-sm text-muted-foreground">Grupos Activos</p>
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
                <div className="text-2xl font-bold">{totalAlumnos}</div>
                <p className="text-sm text-muted-foreground">Alumnos Totales</p>
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
                <div className="text-2xl font-bold">{ocupacionMedia}%</div>
                <p className="text-sm text-muted-foreground">Ocupacion Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalPlazas - totalAlumnos}</div>
                <p className="text-sm text-muted-foreground">Plazas Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Idioma:</span>
          <Button
            variant={selectedIdioma === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIdioma(null)}
          >
            Todos
          </Button>
          {idiomas.map((idioma) => (
            <Button
              key={idioma}
              variant={selectedIdioma === idioma ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIdioma(idioma)}
            >
              {idioma}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Sede:</span>
          <Button
            variant={selectedSede === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSede(null)}
          >
            Todas
          </Button>
          {sedes.map((sede) => (
            <Button
              key={sede}
              variant={selectedSede === sede ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSede(sede)}
            >
              {sede}
            </Button>
          ))}
        </div>
      </div>

      {/* Grupos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGrupos.map((grupo) => (
          <GrupoCard key={grupo.id} grupo={grupo} />
        ))}
      </div>

      {filteredGrupos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron grupos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  )
}
