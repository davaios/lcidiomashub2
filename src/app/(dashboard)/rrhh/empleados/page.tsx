import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Users,
  Building,
  Briefcase,
  GraduationCap,
  Clock,
  MoreVertical,
  Mail,
  Phone,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Empleados",
}

// Mock data
const empleados = [
  {
    id: "1",
    codigo: "EMP-001",
    nombre: "Carlos",
    apellidos: "Martinez Lopez",
    email: "director@lcidiomas.com",
    telefono: "+34 600 111 111",
    departamento: "DIRECCION",
    puesto: "Director General",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2020-01-01",
    estado: "ACTIVO",
  },
  {
    id: "2",
    codigo: "EMP-002",
    nombre: "Ana",
    apellidos: "Garcia Fernandez",
    email: "coordinador@lcidiomas.com",
    telefono: "+34 600 222 222",
    departamento: "ACADEMICO",
    puesto: "Coordinador Academico",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2021-03-15",
    estado: "ACTIVO",
  },
  {
    id: "3",
    codigo: "EMP-003",
    nombre: "Pedro",
    apellidos: "Sanchez Ruiz",
    email: "comercial@lcidiomas.com",
    telefono: "+34 600 333 333",
    departamento: "COMERCIAL",
    puesto: "Asesor Comercial",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2022-06-01",
    estado: "ACTIVO",
  },
  {
    id: "4",
    codigo: "PROF-001",
    nombre: "Maria",
    apellidos: "Garcia Torres",
    email: "maria.garcia@lcidiomas.com",
    telefono: "+34 600 400 400",
    departamento: "ACADEMICO",
    puesto: "Profesora de Ingles",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2019-09-01",
    estado: "ACTIVO",
  },
  {
    id: "5",
    codigo: "PROF-002",
    nombre: "Carlos",
    apellidos: "Lopez Hernandez",
    email: "carlos.lopez@lcidiomas.com",
    telefono: "+34 600 401 401",
    departamento: "ACADEMICO",
    puesto: "Profesor de Ingles/Aleman",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2020-02-15",
    estado: "ACTIVO",
  },
  {
    id: "6",
    codigo: "PROF-003",
    nombre: "Laura",
    apellidos: "Fernandez Diaz",
    email: "laura.fernandez@lcidiomas.com",
    telefono: "+34 600 402 402",
    departamento: "ACADEMICO",
    puesto: "Profesora de Frances",
    sede: "Centro",
    tipoContrato: "TEMPORAL",
    fechaAlta: "2024-01-10",
    estado: "ACTIVO",
  },
  {
    id: "7",
    codigo: "EMP-004",
    nombre: "Elena",
    apellidos: "Martinez Ruiz",
    email: "elena.martinez@lcidiomas.com",
    telefono: "+34 600 444 444",
    departamento: "ADMINISTRACION",
    puesto: "Administrativa",
    sede: "Centro",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2021-09-01",
    estado: "ACTIVO",
  },
  {
    id: "8",
    codigo: "EMP-005",
    nombre: "Roberto",
    apellidos: "Gomez Navarro",
    email: "roberto.gomez@lcidiomas.com",
    telefono: "+34 600 555 555",
    departamento: "ATENCION_CLIENTE",
    puesto: "Atencion al Cliente",
    sede: "Norte",
    tipoContrato: "INDEFINIDO",
    fechaAlta: "2022-03-01",
    estado: "ACTIVO",
  },
]

const departamentoConfig: Record<string, { color: string; label: string }> = {
  DIRECCION: { color: "bg-purple-100 text-purple-800", label: "Direccion" },
  ACADEMICO: { color: "bg-blue-100 text-blue-800", label: "Academico" },
  COMERCIAL: { color: "bg-green-100 text-green-800", label: "Comercial" },
  ADMINISTRACION: { color: "bg-yellow-100 text-yellow-800", label: "Administracion" },
  ATENCION_CLIENTE: { color: "bg-orange-100 text-orange-800", label: "Atencion Cliente" },
  IT: { color: "bg-cyan-100 text-cyan-800", label: "IT" },
  RRHH: { color: "bg-pink-100 text-pink-800", label: "RRHH" },
}

const contratoConfig: Record<string, { color: string; label: string }> = {
  INDEFINIDO: { color: "bg-green-100 text-green-800", label: "Indefinido" },
  TEMPORAL: { color: "bg-yellow-100 text-yellow-800", label: "Temporal" },
  PRACTICAS: { color: "bg-blue-100 text-blue-800", label: "Practicas" },
  FORMACION: { color: "bg-purple-100 text-purple-800", label: "Formacion" },
  AUTONOMO: { color: "bg-gray-100 text-gray-800", label: "Autonomo" },
}

export default function EmpleadosPage() {
  // Stats
  const totalEmpleados = empleados.length
  const porDepartamento = empleados.reduce((acc, e) => {
    acc[e.departamento] = (acc[e.departamento] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const profesores = empleados.filter(e => e.codigo.startsWith("PROF")).length
  const indefinidos = empleados.filter(e => e.tipoContrato === "INDEFINIDO").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Empleados</h1>
          <p className="text-muted-foreground">
            Gestion del personal de la academia
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
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
                <div className="text-2xl font-bold">{totalEmpleados}</div>
                <p className="text-sm text-muted-foreground">Total Empleados</p>
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
                <div className="text-2xl font-bold">{profesores}</div>
                <p className="text-sm text-muted-foreground">Profesores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{indefinidos}</div>
                <p className="text-sm text-muted-foreground">Contratos Indefinidos</p>
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
                <div className="text-2xl font-bold">{Object.keys(porDepartamento).length}</div>
                <p className="text-sm text-muted-foreground">Departamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empleados Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Empleados</CardTitle>
          <CardDescription>{empleados.length} empleados registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {empleados.map((empleado) => (
              <Card key={empleado.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(empleado.nombre, empleado.apellidos.split(" ")[0])}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{empleado.nombre} {empleado.apellidos}</p>
                        <p className="text-sm text-muted-foreground">{empleado.puesto}</p>
                        <p className="text-xs text-muted-foreground">{empleado.codigo}</p>
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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Ver nominas</DropdownMenuItem>
                        <DropdownMenuItem>Ver ausencias</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{empleado.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{empleado.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>Sede {empleado.sede}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Alta: {formatDate(empleado.fechaAlta)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Badge className={departamentoConfig[empleado.departamento]?.color}>
                      {departamentoConfig[empleado.departamento]?.label}
                    </Badge>
                    <Badge className={contratoConfig[empleado.tipoContrato]?.color}>
                      {contratoConfig[empleado.tipoContrato]?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
