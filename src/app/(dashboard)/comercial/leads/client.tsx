"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Phone,
  Mail,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Filter,
  Download,
  Upload,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Lead {
  id: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  segmento: string
  origen: string
  estado: string
  temperatura: string
  score: number
  idiomaInteres: string
  nivelDetectado: string | null
  comercial: string | null
  createdAt: string
}

const estadoColors: Record<string, string> = {
  NUEVO: "bg-gray-500",
  CONTACTADO: "bg-blue-500",
  TEST_REALIZADO: "bg-yellow-500",
  PROPUESTA_ENVIADA: "bg-purple-500",
  NEGOCIACION: "bg-orange-500",
  ACEPTADO: "bg-green-500",
  MATRICULADO: "bg-green-700",
  PERDIDO: "bg-red-500",
  NO_CUALIFICADO: "bg-gray-400",
}

const temperaturaColors: Record<string, string> = {
  FRIO: "bg-blue-200 text-blue-800",
  TIBIO: "bg-yellow-200 text-yellow-800",
  CALIENTE: "bg-orange-200 text-orange-800",
  MUY_CALIENTE: "bg-red-200 text-red-800",
}

const segmentoLabels: Record<string, string> = {
  ADULTO_PARTICULAR: "Adulto",
  NINO_PARTICULAR: "Nino",
  EMPRESA: "Empresa",
  COLEGIO: "Colegio",
  ERASMUS: "Erasmus",
  CAMPAMENTO: "Campamento",
}

const estadoLabels: Record<string, string> = {
  NUEVO: "Nuevo",
  CONTACTADO: "Contactado",
  TEST_REALIZADO: "Test Realizado",
  PROPUESTA_ENVIADA: "Propuesta Enviada",
  NEGOCIACION: "Negociacion",
  ACEPTADO: "Aceptado",
  MATRICULADO: "Matriculado",
  PERDIDO: "Perdido",
  NO_CUALIFICADO: "No Cualificado",
}

export function LeadsClient({ leads }: { leads: Lead[] }) {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null)

  const filteredLeads = selectedEstado
    ? leads.filter((lead) => lead.estado === selectedEstado)
    : leads

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.original.nombre} {row.original.apellidos}
          </p>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "telefono",
      header: "Telefono",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.telefono}</span>
      ),
    },
    {
      accessorKey: "segmento",
      header: "Segmento",
      cell: ({ row }) => (
        <Badge variant="outline">
          {segmentoLabels[row.original.segmento] || row.original.segmento}
        </Badge>
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
      accessorKey: "temperatura",
      header: "Temp.",
      cell: ({ row }) => (
        <Badge
          className={temperaturaColors[row.original.temperatura]}
          variant="secondary"
        >
          {row.original.temperatura.replace("_", " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full ${
                row.original.score >= 80
                  ? "bg-green-500"
                  : row.original.score >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${row.original.score}%` }}
            />
          </div>
          <span className="text-sm font-medium">{row.original.score}</span>
        </div>
      ),
    },
    {
      accessorKey: "idiomaInteres",
      header: "Idioma",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.idiomaInteres}</span>
      ),
    },
    {
      accessorKey: "comercial",
      header: "Comercial",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.comercial || (
            <span className="text-muted-foreground">Sin asignar</span>
          )}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.createdAt)}
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
              Ver detalle
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone className="mr-2 h-4 w-4" />
              Llamar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Enviar email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Crear propuesta
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  // Count leads by estado
  const estadoCounts = leads.reduce((acc, lead) => {
    acc[lead.estado] = (acc[lead.estado] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Gestiona todos los leads y oportunidades comerciales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Estado Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedEstado === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedEstado(null)}
        >
          Todos ({leads.length})
        </Button>
        {Object.entries(estadoLabels).map(([key, label]) => {
          const count = estadoCounts[key] || 0
          if (count === 0) return null
          return (
            <Button
              key={key}
              variant={selectedEstado === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedEstado(key)}
              className="gap-2"
            >
              <div
                className={`h-2 w-2 rounded-full ${estadoColors[key]}`}
              />
              {label} ({count})
            </Button>
          )
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {leads.filter((l) => l.temperatura === "CALIENTE" || l.temperatura === "MUY_CALIENTE").length}
            </div>
            <p className="text-sm text-muted-foreground">Leads Calientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter((l) => l.estado === "MATRICULADO").length}
            </div>
            <p className="text-sm text-muted-foreground">Matriculados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length)}
            </div>
            <p className="text-sm text-muted-foreground">Score Promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
          <CardDescription>
            {filteredLeads.length} leads encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredLeads}
            searchKey="nombre"
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
