import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Mail,
  Phone,
  Star,
  MoreVertical,
  Globe,
  Award,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Profesores",
}

// Mock data
const profesores = [
  {
    id: "1",
    codigo: "PROF-001",
    nombre: "Maria",
    apellidos: "Garcia Torres",
    email: "maria.garcia@lcidiomas.com",
    telefono: "+34 600 400 400",
    sede: "Centro",
    idiomas: ["Ingles"],
    especialidades: ["Business English", "Cambridge"],
    certificaciones: ["CELTA", "DELTA"],
    grupos: 4,
    alumnos: 35,
    horasSemana: 24,
    valoracion: 4.8,
    estado: "ACTIVO",
  },
  {
    id: "2",
    codigo: "PROF-002",
    nombre: "Carlos",
    apellidos: "Lopez Hernandez",
    email: "carlos.lopez@lcidiomas.com",
    telefono: "+34 600 401 401",
    sede: "Centro",
    idiomas: ["Ingles", "Aleman"],
    especialidades: ["General English", "Conversacion"],
    certificaciones: ["CELTA", "TKT"],
    grupos: 3,
    alumnos: 28,
    horasSemana: 20,
    valoracion: 4.6,
    estado: "ACTIVO",
  },
  {
    id: "3",
    codigo: "PROF-003",
    nombre: "Laura",
    apellidos: "Fernandez Diaz",
    email: "laura.fernandez@lcidiomas.com",
    telefono: "+34 600 402 402",
    sede: "Centro",
    idiomas: ["Frances"],
    especialidades: ["DELF", "Conversacion"],
    certificaciones: ["DAEFLE"],
    grupos: 2,
    alumnos: 14,
    horasSemana: 12,
    valoracion: 4.7,
    estado: "ACTIVO",
  },
  {
    id: "4",
    codigo: "PROF-004",
    nombre: "John",
    apellidos: "Smith",
    email: "john.smith@lcidiomas.com",
    telefono: "+34 600 403 403",
    sede: "Norte",
    idiomas: ["Ingles"],
    especialidades: ["IELTS", "TOEFL", "Ninos"],
    certificaciones: ["CELTA", "TYLEC"],
    grupos: 3,
    alumnos: 26,
    horasSemana: 18,
    valoracion: 4.9,
    estado: "ACTIVO",
  },
  {
    id: "5",
    codigo: "PROF-005",
    nombre: "Anna",
    apellidos: "Mueller",
    email: "anna.mueller@lcidiomas.com",
    telefono: "+34 600 404 404",
    sede: "Sur",
    idiomas: ["Aleman"],
    especialidades: ["Goethe", "Business German"],
    certificaciones: ["DaF"],
    grupos: 2,
    alumnos: 12,
    horasSemana: 10,
    valoracion: 4.5,
    estado: "ACTIVO",
  },
  {
    id: "6",
    codigo: "PROF-006",
    nombre: "Sofia",
    apellidos: "Martinez Ruiz",
    email: "sofia.martinez@lcidiomas.com",
    telefono: "+34 600 405 405",
    sede: "Centro",
    idiomas: ["Ingles"],
    especialidades: ["Ninos", "Extraescolares"],
    certificaciones: ["CELTA", "TYLEC"],
    grupos: 0,
    alumnos: 0,
    horasSemana: 0,
    valoracion: 0,
    estado: "BAJA",
  },
]

const idiomaFlags: Record<string, string> = {
  Ingles: "🇬🇧",
  Aleman: "🇩🇪",
  Frances: "🇫🇷",
  Italiano: "🇮🇹",
  Portugues: "🇵🇹",
  Chino: "🇨🇳",
}

export default function ProfesoresPage() {
  // Stats
  const totalProfesores = profesores.filter((p) => p.estado === "ACTIVO").length
  const totalGrupos = profesores.reduce((acc, p) => acc + p.grupos, 0)
  const totalAlumnos = profesores.reduce((acc, p) => acc + p.alumnos, 0)
  const promedioValoracion =
    profesores.filter((p) => p.valoracion > 0).reduce((acc, p) => acc + p.valoracion, 0) /
    profesores.filter((p) => p.valoracion > 0).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profesores</h1>
          <p className="text-muted-foreground">
            Gestion del equipo docente
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Profesor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalProfesores}</div>
                <p className="text-sm text-muted-foreground">Profesores Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalGrupos}</div>
                <p className="text-sm text-muted-foreground">Grupos Asignados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
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
              <div className="rounded-full bg-yellow-100 p-2">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{promedioValoracion.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Valoracion Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profesores Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profesores.map((profesor) => (
          <Card
            key={profesor.id}
            className={`hover:shadow-md transition-shadow ${
              profesor.estado === "BAJA" ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(profesor.nombre, profesor.apellidos.split(" ")[0])}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {profesor.nombre} {profesor.apellidos}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {profesor.codigo} - Sede {profesor.sede}
                    </CardDescription>
                  </div>
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
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Ver horario</DropdownMenuItem>
                    <DropdownMenuItem>Asignar grupo</DropdownMenuItem>
                    <DropdownMenuItem>Ver evaluaciones</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contacto */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{profesor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{profesor.telefono}</span>
                  </div>
                </div>

                {/* Idiomas */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Idiomas
                  </p>
                  <div className="flex gap-1">
                    {profesor.idiomas.map((idioma) => (
                      <Badge key={idioma} variant="outline" className="text-xs">
                        {idiomaFlags[idioma]} {idioma}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Especialidades */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Especialidades</p>
                  <div className="flex flex-wrap gap-1">
                    {profesor.especialidades.map((esp) => (
                      <Badge key={esp} className="text-xs bg-blue-100 text-blue-800">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certificaciones */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Award className="h-3 w-3" /> Certificaciones
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {profesor.certificaciones.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {profesor.estado === "ACTIVO" && (
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t text-center">
                    <div>
                      <p className="text-lg font-bold">{profesor.grupos}</p>
                      <p className="text-xs text-muted-foreground">Grupos</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{profesor.alumnos}</p>
                      <p className="text-xs text-muted-foreground">Alumnos</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{profesor.horasSemana}h</p>
                      <p className="text-xs text-muted-foreground">Semana</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold flex items-center justify-center gap-0.5">
                        {profesor.valoracion}
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                )}

                {profesor.estado === "BAJA" && (
                  <div className="pt-2 border-t">
                    <Badge variant="destructive">De baja</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
