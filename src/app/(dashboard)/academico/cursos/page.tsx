import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  BookOpen,
  Clock,
  Users,
  DollarSign,
  GraduationCap,
  Globe,
  Settings,
  MoreVertical,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Cursos",
}

// Mock data
const cursos = [
  {
    id: "1",
    codigo: "ING-A1",
    nombre: "Ingles A1 - Principiante",
    idioma: "Ingles",
    nivel: "A1",
    duracionHoras: 60,
    sesiones: 30,
    precioParticular: 890,
    precioEmpresa: 1068,
    grupos: 3,
    alumnos: 28,
    activo: true,
    preparaExamen: false,
  },
  {
    id: "2",
    codigo: "ING-A2",
    nombre: "Ingles A2 - Elemental",
    idioma: "Ingles",
    nivel: "A2",
    duracionHoras: 60,
    sesiones: 30,
    precioParticular: 890,
    precioEmpresa: 1068,
    grupos: 4,
    alumnos: 35,
    activo: true,
    preparaExamen: false,
  },
  {
    id: "3",
    codigo: "ING-B1",
    nombre: "Ingles B1 - Intermedio",
    idioma: "Ingles",
    nivel: "B1",
    duracionHoras: 80,
    sesiones: 40,
    precioParticular: 1090,
    precioEmpresa: 1308,
    grupos: 5,
    alumnos: 42,
    activo: true,
    preparaExamen: true,
    examenOficial: "PET",
  },
  {
    id: "4",
    codigo: "ING-B2",
    nombre: "Ingles B2 - Intermedio Alto",
    idioma: "Ingles",
    nivel: "B2",
    duracionHoras: 80,
    sesiones: 40,
    precioParticular: 1190,
    precioEmpresa: 1428,
    grupos: 4,
    alumnos: 32,
    activo: true,
    preparaExamen: true,
    examenOficial: "FCE",
  },
  {
    id: "5",
    codigo: "ING-C1",
    nombre: "Ingles C1 - Avanzado",
    idioma: "Ingles",
    nivel: "C1",
    duracionHoras: 100,
    sesiones: 50,
    precioParticular: 1450,
    precioEmpresa: 1740,
    grupos: 2,
    alumnos: 14,
    activo: true,
    preparaExamen: true,
    examenOficial: "CAE",
  },
  {
    id: "6",
    codigo: "ALE-A1",
    nombre: "Aleman A1 - Principiante",
    idioma: "Aleman",
    nivel: "A1",
    duracionHoras: 60,
    sesiones: 30,
    precioParticular: 950,
    precioEmpresa: 1140,
    grupos: 2,
    alumnos: 12,
    activo: true,
    preparaExamen: true,
    examenOficial: "Goethe A1",
  },
  {
    id: "7",
    codigo: "FRA-A1",
    nombre: "Frances A1 - Principiante",
    idioma: "Frances",
    nivel: "A1",
    duracionHoras: 60,
    sesiones: 30,
    precioParticular: 890,
    precioEmpresa: 1068,
    grupos: 1,
    alumnos: 7,
    activo: true,
    preparaExamen: true,
    examenOficial: "DELF A1",
  },
  {
    id: "8",
    codigo: "ING-BUS",
    nombre: "Business English",
    idioma: "Ingles",
    nivel: "B2",
    duracionHoras: 40,
    sesiones: 20,
    precioParticular: 750,
    precioEmpresa: 900,
    grupos: 2,
    alumnos: 10,
    activo: true,
    preparaExamen: false,
  },
]

const nivelConfig: Record<string, { color: string }> = {
  A1: { color: "bg-green-100 text-green-800" },
  A2: { color: "bg-blue-100 text-blue-800" },
  B1: { color: "bg-purple-100 text-purple-800" },
  B2: { color: "bg-yellow-100 text-yellow-800" },
  C1: { color: "bg-orange-100 text-orange-800" },
  C2: { color: "bg-red-100 text-red-800" },
}

const idiomaConfig: Record<string, { color: string; flag: string }> = {
  Ingles: { color: "bg-blue-500", flag: "🇬🇧" },
  Aleman: { color: "bg-yellow-500", flag: "🇩🇪" },
  Frances: { color: "bg-red-500", flag: "🇫🇷" },
  Italiano: { color: "bg-green-500", flag: "🇮🇹" },
}

export default function CursosPage() {
  // Stats
  const totalCursos = cursos.length
  const totalAlumnos = cursos.reduce((acc, c) => acc + c.alumnos, 0)
  const totalGrupos = cursos.reduce((acc, c) => acc + c.grupos, 0)
  const idiomas = [...new Set(cursos.map((c) => c.idioma))].length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="text-muted-foreground">
            Catalogo de cursos disponibles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Curso
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
                <div className="text-2xl font-bold">{totalCursos}</div>
                <p className="text-sm text-muted-foreground">Total Cursos</p>
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
                <p className="text-sm text-muted-foreground">Alumnos Inscritos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalGrupos}</div>
                <p className="text-sm text-muted-foreground">Grupos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <Globe className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{idiomas}</div>
                <p className="text-sm text-muted-foreground">Idiomas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cursos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <Card key={curso.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{idiomaConfig[curso.idioma]?.flag}</span>
                  <div>
                    <CardTitle className="text-lg">{curso.nombre}</CardTitle>
                    <CardDescription>{curso.codigo}</CardDescription>
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
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Editar curso</DropdownMenuItem>
                    <DropdownMenuItem>Ver grupos</DropdownMenuItem>
                    <DropdownMenuItem>Gestionar syllabus</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Nivel y Examen */}
                <div className="flex items-center gap-2">
                  <Badge className={nivelConfig[curso.nivel]?.color}>
                    Nivel {curso.nivel}
                  </Badge>
                  {curso.preparaExamen && (
                    <Badge variant="outline" className="text-xs">
                      Prepara {curso.examenOficial}
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{curso.duracionHoras}h ({curso.sesiones} sesiones)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{curso.alumnos} alumnos</span>
                  </div>
                </div>

                {/* Precios */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Particular</p>
                      <p className="font-bold text-lg">{formatCurrency(curso.precioParticular)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Empresa</p>
                      <p className="font-bold text-lg">{formatCurrency(curso.precioEmpresa)}</p>
                    </div>
                  </div>
                </div>

                {/* Grupos */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">
                    {curso.grupos} grupos activos
                  </span>
                  <Button variant="outline" size="sm">
                    Ver grupos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
