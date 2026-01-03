"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DataTable } from "@/components/tables/data-table"
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
  MoreHorizontal,
  Eye,
  Pencil,
  Mail,
  FileText,
  Calendar,
  GraduationCap,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"

interface Alumno {
  id: string
  codigo: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fechaNacimiento: string
  nivelActual: string
  idiomas: string[]
  grupos: string[]
  sede: string
  estado: string
  asistencia: number
  ultimaClase: string
  proximaClase: string | null
  esMenor?: boolean
  tutor?: string
}

const estadoColors: Record<string, string> = {
  ACTIVO: "bg-green-500",
  BAJA_TEMPORAL: "bg-yellow-500",
  BAJA: "bg-red-500",
  COMPLETADO: "bg-blue-500",
}

const estadoLabels: Record<string, string> = {
  ACTIVO: "Activo",
  BAJA_TEMPORAL: "Baja Temporal",
  BAJA: "Baja",
  COMPLETADO: "Completado",
}

const nivelColors: Record<string, string> = {
  A1: "bg-green-100 text-green-800",
  A2: "bg-green-200 text-green-800",
  B1: "bg-blue-100 text-blue-800",
  B2: "bg-blue-200 text-blue-800",
  C1: "bg-purple-100 text-purple-800",
  C2: "bg-purple-200 text-purple-800",
}

export function AlumnosClient({ alumnos }: { alumnos: Alumno[] }) {
  const [selectedSede, setSelectedSede] = useState<string | null>(null)

  const sedes = [...new Set(alumnos.map((a) => a.sede))]
  const filteredAlumnos = selectedSede
    ? alumnos.filter((a) => a.sede === selectedSede)
    : alumnos

  const columns: ColumnDef<Alumno>[] = [
    {
      accessorKey: "nombre",
      header: "Alumno",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(row.original.nombre, row.original.apellidos)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {row.original.nombre} {row.original.apellidos}
            </p>
            <p className="text-xs text-muted-foreground">{row.original.codigo}</p>
          </div>
          {row.original.esMenor && (
            <Badge variant="outline" className="text-xs">
              Menor
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "nivelActual",
      header: "Nivel",
      cell: ({ row }) => (
        <Badge className={nivelColors[row.original.nivelActual]}>
          {row.original.nivelActual}
        </Badge>
      ),
    },
    {
      accessorKey: "idiomas",
      header: "Idiomas",
      cell: ({ row }) => (
        <div className="flex gap-1 flex-wrap">
          {row.original.idiomas.map((idioma) => (
            <Badge key={idioma} variant="outline" className="text-xs">
              {idioma}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "grupos",
      header: "Grupos",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.grupos.length > 0 ? (
            <span>{row.original.grupos.join(", ")}</span>
          ) : (
            <span className="text-muted-foreground">Sin grupo</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "sede",
      header: "Sede",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.sede}</span>
      ),
    },
    {
      accessorKey: "asistencia",
      header: "Asistencia",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-12 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full ${
                row.original.asistencia >= 90
                  ? "bg-green-500"
                  : row.original.asistencia >= 75
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.original.asistencia}%` }}
            />
          </div>
          <span className="text-sm">{row.original.asistencia}%</span>
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              estadoColors[row.original.estado] || "bg-gray-500"
            }`}
          />
          <span className="text-sm">
            {estadoLabels[row.original.estado] || row.original.estado}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "proximaClase",
      header: "Proxima Clase",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.proximaClase
            ? formatDate(row.original.proximaClase)
            : "-"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver ficha
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Enviar email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Ver horario
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Evaluaciones
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // Stats
  const alumnosActivos = alumnos.filter((a) => a.estado === "ACTIVO").length
  const asistenciaPromedio = Math.round(
    alumnos.reduce((acc, a) => acc + a.asistencia, 0) / alumnos.length
  )
  const alumnosBajaAsistencia = alumnos.filter((a) => a.asistencia < 75).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alumnos</h1>
          <p className="text-muted-foreground">
            Gestiona todos los alumnos matriculados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Alumno
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{alumnosActivos}</div>
                <p className="text-sm text-muted-foreground">Alumnos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{alumnos.length}</div>
                <p className="text-sm text-muted-foreground">Total Alumnos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{asistenciaPromedio}%</div>
                <p className="text-sm text-muted-foreground">Asistencia Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{alumnosBajaAsistencia}</div>
                <p className="text-sm text-muted-foreground">Baja Asistencia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sede Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedSede === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedSede(null)}
        >
          Todas las Sedes ({alumnos.length})
        </Button>
        {sedes.map((sede) => {
          const count = alumnos.filter((a) => a.sede === sede).length
          return (
            <Button
              key={sede}
              variant={selectedSede === sede ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSede(sede)}
            >
              {sede} ({count})
            </Button>
          )
        })}
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alumnos</CardTitle>
          <CardDescription>
            {filteredAlumnos.length} alumnos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredAlumnos}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
