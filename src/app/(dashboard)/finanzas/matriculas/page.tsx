import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  FileText,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Matriculas",
}

// Mock data
const matriculas = [
  {
    id: "1",
    codigo: "MAT-2026-0001",
    alumno: "Carlos Rodriguez Martinez",
    curso: "Ingles General B1",
    sede: "Tenerife Centro",
    fechaMatricula: "2025-09-01",
    fechaInicio: "2025-09-15",
    importeBase: 1200,
    descuento: 0,
    importeFinal: 1200,
    formaPago: "MENSUAL",
    cuotas: 10,
    estado: "ACTIVA",
  },
  {
    id: "2",
    codigo: "MAT-2026-0002",
    alumno: "Ana Lopez Fernandez",
    curso: "Ingles General A2 + Frances A1",
    sede: "Tenerife Centro",
    fechaMatricula: "2025-09-05",
    fechaInicio: "2025-10-01",
    importeBase: 2100,
    descuento: 210,
    importeFinal: 1890,
    formaPago: "TRIMESTRAL",
    cuotas: 4,
    estado: "ACTIVA",
  },
  {
    id: "3",
    codigo: "MAT-2026-0003",
    alumno: "Miguel Garcia Perez",
    curso: "Aleman Iniciacion A1",
    sede: "Las Palmas",
    fechaMatricula: "2025-09-10",
    fechaInicio: "2025-10-01",
    importeBase: 980,
    descuento: 98,
    importeFinal: 882,
    formaPago: "MENSUAL",
    cuotas: 10,
    estado: "ACTIVA",
  },
  {
    id: "4",
    codigo: "MAT-2026-0004",
    alumno: "Laura Martinez Ruiz",
    curso: "Ingles Avanzado C1",
    sede: "Tenerife Centro",
    fechaMatricula: "2025-08-20",
    fechaInicio: "2025-09-20",
    importeBase: 1450,
    descuento: 0,
    importeFinal: 1450,
    formaPago: "CONTADO",
    cuotas: 1,
    estado: "ACTIVA",
  },
  {
    id: "5",
    codigo: "MAT-2026-0005",
    alumno: "David Sanchez Gomez",
    curso: "Ingles General B2",
    sede: "Las Palmas",
    fechaMatricula: "2025-09-01",
    fechaInicio: "2025-09-15",
    importeBase: 1200,
    descuento: 0,
    importeFinal: 1200,
    formaPago: "DOMICILIACION",
    cuotas: 10,
    estado: "BAJA_TEMPORAL",
  },
  {
    id: "6",
    codigo: "MAT-2026-0006",
    alumno: "Tech Solutions SL",
    curso: "Ingles Business B1 (In-Company)",
    sede: "In-Company",
    fechaMatricula: "2025-10-15",
    fechaInicio: "2025-11-01",
    importeBase: 8500,
    descuento: 850,
    importeFinal: 7650,
    formaPago: "FUNDAE",
    cuotas: 1,
    estado: "ACTIVA",
    esEmpresa: true,
  },
  {
    id: "7",
    codigo: "MAT-2026-0007",
    alumno: "Elena Fernandez Torres",
    curso: "Ingles Iniciacion A1",
    sede: "Tenerife Centro",
    fechaMatricula: "2025-10-10",
    fechaInicio: "2025-10-15",
    importeBase: 890,
    descuento: 0,
    importeFinal: 890,
    formaPago: "MENSUAL",
    cuotas: 10,
    estado: "PENDIENTE_PAGO",
  },
]

const estadoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  PENDIENTE_PAGO: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pendiente Pago" },
  ACTIVA: { color: "bg-green-100 text-green-800", icon: CheckCircle2, label: "Activa" },
  COMPLETADA: { color: "bg-blue-100 text-blue-800", icon: CheckCircle2, label: "Completada" },
  BAJA_VOLUNTARIA: { color: "bg-gray-100 text-gray-800", icon: XCircle, label: "Baja Voluntaria" },
  BAJA_TEMPORAL: { color: "bg-orange-100 text-orange-800", icon: Clock, label: "Baja Temporal" },
  BAJA_IMPAGO: { color: "bg-red-100 text-red-800", icon: AlertCircle, label: "Baja Impago" },
  CANCELADA: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Cancelada" },
}

export default function MatriculasPage() {
  // Stats
  const matriculasActivas = matriculas.filter((m) => m.estado === "ACTIVA").length
  const pendientesPago = matriculas.filter((m) => m.estado === "PENDIENTE_PAGO").length
  const totalFacturado = matriculas.reduce((acc, m) => acc + m.importeFinal, 0)
  const totalDescuentos = matriculas.reduce((acc, m) => acc + m.descuento, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Matriculas</h1>
          <p className="text-muted-foreground">
            Gestiona todas las matriculaciones del centro
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Matricula
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{matriculasActivas}</div>
                <p className="text-sm text-muted-foreground">Matriculas Activas</p>
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
                <div className="text-2xl font-bold">{pendientesPago}</div>
                <p className="text-sm text-muted-foreground">Pendientes Pago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalFacturado)}</div>
                <p className="text-sm text-muted-foreground">Total Facturado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalDescuentos)}</div>
                <p className="text-sm text-muted-foreground">Descuentos Aplicados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matriculas List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Matriculas</CardTitle>
          <CardDescription>{matriculas.length} matriculas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {matriculas.map((matricula) => {
              const EstadoIcon = estadoConfig[matricula.estado]?.icon || FileText
              return (
                <div
                  key={matricula.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{matricula.alumno}</p>
                        <span className="text-xs text-muted-foreground">
                          {matricula.codigo}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {matricula.curso} - {matricula.sede}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(matricula.importeFinal)}</p>
                      {matricula.descuento > 0 && (
                        <p className="text-xs text-green-600">
                          -{formatCurrency(matricula.descuento)} dto.
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{matricula.formaPago}</p>
                      {matricula.cuotas > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {matricula.cuotas} cuotas
                        </p>
                      )}
                    </div>
                    <Badge className={estadoConfig[matricula.estado]?.color}>
                      <EstadoIcon className="h-3 w-3 mr-1" />
                      {estadoConfig[matricula.estado]?.label}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Ver detalle
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
