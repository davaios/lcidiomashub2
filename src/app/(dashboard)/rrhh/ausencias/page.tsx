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
  Plane,
  Heart,
  FileText,
} from "lucide-react"
import { getInitials, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Ausencias",
}

// Mock data
const ausencias = [
  {
    id: "1",
    empleado: "Maria Garcia Torres",
    codigo: "PROF-001",
    tipo: "VACACIONES",
    fechaInicio: "2026-01-20",
    fechaFin: "2026-01-24",
    dias: 5,
    motivo: "Vacaciones de invierno",
    estado: "APROBADA",
  },
  {
    id: "2",
    empleado: "Carlos Lopez Hernandez",
    codigo: "PROF-002",
    tipo: "BAJA_MEDICA",
    fechaInicio: "2026-01-06",
    fechaFin: "2026-01-10",
    dias: 5,
    motivo: "Gripe",
    estado: "APROBADA",
  },
  {
    id: "3",
    empleado: "Laura Fernandez Diaz",
    codigo: "PROF-003",
    tipo: "ASUNTOS_PROPIOS",
    fechaInicio: "2026-01-15",
    fechaFin: "2026-01-15",
    dias: 1,
    motivo: "Tramites personales",
    estado: "PENDIENTE",
  },
  {
    id: "4",
    empleado: "Pedro Sanchez Ruiz",
    codigo: "EMP-003",
    tipo: "PERMISO_RETRIBUIDO",
    fechaInicio: "2026-01-08",
    fechaFin: "2026-01-09",
    dias: 2,
    motivo: "Mudanza",
    estado: "APROBADA",
  },
  {
    id: "5",
    empleado: "Elena Martinez Ruiz",
    codigo: "EMP-004",
    tipo: "VACACIONES",
    fechaInicio: "2026-02-01",
    fechaFin: "2026-02-07",
    dias: 7,
    motivo: "Viaje familiar",
    estado: "PENDIENTE",
  },
  {
    id: "6",
    empleado: "Ana Garcia Fernandez",
    codigo: "EMP-002",
    tipo: "ASUNTOS_PROPIOS",
    fechaInicio: "2026-01-03",
    fechaFin: "2026-01-03",
    dias: 1,
    motivo: "Cita medica",
    estado: "APROBADA",
  },
  {
    id: "7",
    empleado: "Roberto Gomez Navarro",
    codigo: "EMP-005",
    tipo: "VACACIONES",
    fechaInicio: "2026-01-27",
    fechaFin: "2026-01-31",
    dias: 5,
    motivo: null,
    estado: "RECHAZADA",
  },
]

const tipoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  VACACIONES: { color: "bg-blue-100 text-blue-800", icon: Plane, label: "Vacaciones" },
  BAJA_MEDICA: { color: "bg-red-100 text-red-800", icon: Heart, label: "Baja Medica" },
  PERMISO_RETRIBUIDO: { color: "bg-green-100 text-green-800", icon: FileText, label: "Permiso Retribuido" },
  PERMISO_NO_RETRIBUIDO: { color: "bg-yellow-100 text-yellow-800", icon: FileText, label: "Permiso No Retribuido" },
  ASUNTOS_PROPIOS: { color: "bg-purple-100 text-purple-800", icon: Calendar, label: "Asuntos Propios" },
  OTRO: { color: "bg-gray-100 text-gray-800", icon: FileText, label: "Otro" },
}

const estadoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  PENDIENTE: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pendiente" },
  APROBADA: { color: "bg-green-100 text-green-800", icon: CheckCircle2, label: "Aprobada" },
  RECHAZADA: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Rechazada" },
  CANCELADA: { color: "bg-gray-100 text-gray-800", icon: AlertCircle, label: "Cancelada" },
}

export default function AusenciasPage() {
  // Stats
  const pendientes = ausencias.filter(a => a.estado === "PENDIENTE").length
  const aprobadas = ausencias.filter(a => a.estado === "APROBADA").length
  const diasVacaciones = ausencias
    .filter(a => a.tipo === "VACACIONES" && a.estado === "APROBADA")
    .reduce((acc, a) => acc + a.dias, 0)
  const diasBaja = ausencias
    .filter(a => a.tipo === "BAJA_MEDICA")
    .reduce((acc, a) => acc + a.dias, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ausencias</h1>
          <p className="text-muted-foreground">
            Control de vacaciones, bajas y permisos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Clock className="h-5 w-5 text-yellow-600" />
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
                <div className="text-2xl font-bold">{aprobadas}</div>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Plane className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{diasVacaciones}</div>
                <p className="text-sm text-muted-foreground">Dias Vacaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{diasBaja}</div>
                <p className="text-sm text-muted-foreground">Dias Baja Medica</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solicitudes Pendientes */}
      {pendientes > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Solicitudes Pendientes de Aprobacion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ausencias
                .filter(a => a.estado === "PENDIENTE")
                .map((ausencia) => {
                  const TipoIcon = tipoConfig[ausencia.tipo]?.icon || FileText
                  return (
                    <div
                      key={ausencia.id}
                      className="flex items-center justify-between rounded-lg border bg-white p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {getInitials(ausencia.empleado.split(" ")[0], ausencia.empleado.split(" ")[1] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{ausencia.empleado}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(ausencia.fechaInicio)} - {formatDate(ausencia.fechaFin)} ({ausencia.dias} dias)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={tipoConfig[ausencia.tipo]?.color}>
                          <TipoIcon className="h-3 w-3 mr-1" />
                          {tipoConfig[ausencia.tipo]?.label}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            Rechazar
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Aprobar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Todas las Ausencias */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Ausencias</CardTitle>
          <CardDescription>{ausencias.length} solicitudes registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left text-sm font-medium">Empleado</th>
                  <th className="p-3 text-left text-sm font-medium">Tipo</th>
                  <th className="p-3 text-left text-sm font-medium">Periodo</th>
                  <th className="p-3 text-center text-sm font-medium">Dias</th>
                  <th className="p-3 text-left text-sm font-medium">Motivo</th>
                  <th className="p-3 text-left text-sm font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {ausencias.map((ausencia) => {
                  const TipoIcon = tipoConfig[ausencia.tipo]?.icon || FileText
                  const EstadoIcon = estadoConfig[ausencia.estado]?.icon || Clock
                  return (
                    <tr key={ausencia.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(ausencia.empleado.split(" ")[0], ausencia.empleado.split(" ")[1] || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{ausencia.empleado}</p>
                            <p className="text-xs text-muted-foreground">{ausencia.codigo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={tipoConfig[ausencia.tipo]?.color}>
                          <TipoIcon className="h-3 w-3 mr-1" />
                          {tipoConfig[ausencia.tipo]?.label}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">{formatDate(ausencia.fechaInicio)}</p>
                        <p className="text-xs text-muted-foreground">al {formatDate(ausencia.fechaFin)}</p>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-medium">{ausencia.dias}</span>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-muted-foreground max-w-xs truncate">
                          {ausencia.motivo || "-"}
                        </p>
                      </td>
                      <td className="p-3">
                        <Badge className={estadoConfig[ausencia.estado]?.color}>
                          <EstadoIcon className="h-3 w-3 mr-1" />
                          {estadoConfig[ausencia.estado]?.label}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
