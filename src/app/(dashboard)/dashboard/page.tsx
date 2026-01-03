import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  Wallet,
  TrendingUp,
  CalendarCheck,
  Target,
  Clock,
  AlertTriangle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
}

const kpis = [
  {
    title: "Alumnos Activos",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Leads Este Mes",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Facturacion Mensual",
    value: "87.450 EUR",
    change: "+8%",
    trend: "up",
    icon: Wallet,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Tasa Conversion",
    value: "32%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const pipeline = [
  { estado: "Nuevo", count: 45, color: "bg-gray-500" },
  { estado: "Contactado", count: 38, color: "bg-blue-500" },
  { estado: "Test Realizado", count: 24, color: "bg-yellow-500" },
  { estado: "Propuesta Enviada", count: 18, color: "bg-purple-500" },
  { estado: "Negociacion", count: 12, color: "bg-orange-500" },
  { estado: "Matriculado", count: 8, color: "bg-green-500" },
]

const clasesHoy = [
  { hora: "09:00", grupo: "B1-MJ-001", profesor: "Maria Garcia", aula: "Aula 3", alumnos: 8 },
  { hora: "10:30", grupo: "A2-LMV-002", profesor: "Carlos Lopez", aula: "Aula 1", alumnos: 10 },
  { hora: "12:00", grupo: "C1-SS-003", profesor: "Ana Martinez", aula: "Aula 5", alumnos: 6 },
  { hora: "16:00", grupo: "B2-MJ-004", profesor: "Pedro Sanchez", aula: "Aula 2", alumnos: 9 },
  { hora: "18:00", grupo: "A1-LMV-005", profesor: "Laura Fernandez", aula: "Aula 4", alumnos: 12 },
]

const alertas = [
  { tipo: "urgente", mensaje: "5 pagos vencidos hace mas de 30 dias", icon: AlertTriangle },
  { tipo: "warning", mensaje: "3 profesores sin disponibilidad proxima semana", icon: Clock },
  { tipo: "info", mensaje: "15 tests de nivel pendientes de evaluar", icon: Target },
]

const tareasHoy = [
  { tarea: "Llamar a lead Carlos Ruiz", tipo: "comercial", hora: "10:00" },
  { tarea: "Enviar propuesta Empresa ABC", tipo: "comercial", hora: "11:30" },
  { tarea: "Reunion coordinacion academica", tipo: "academico", hora: "13:00" },
  { tarea: "Revisar solicitudes ausencia", tipo: "rrhh", hora: "15:00" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general del sistema LCidiomas
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-green-600">{kpi.change} vs mes anterior</p>
                </div>
                <div className={`rounded-full p-3 ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pipeline Comercial */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline Comercial</CardTitle>
            <CardDescription>Estado actual de los leads en proceso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipeline.map((item) => (
                <div key={item.estado} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">{item.estado}</div>
                  <div className="flex-1">
                    <div className="h-8 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full ${item.color} flex items-center justify-end pr-3`}
                        style={{ width: `${(item.count / 50) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas y Avisos</CardTitle>
            <CardDescription>Requieren atencion inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertas.map((alerta, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 rounded-lg p-3 ${
                    alerta.tipo === "urgente"
                      ? "bg-destructive/10"
                      : alerta.tipo === "warning"
                      ? "bg-yellow-500/10"
                      : "bg-blue-500/10"
                  }`}
                >
                  <alerta.icon
                    className={`h-5 w-5 mt-0.5 ${
                      alerta.tipo === "urgente"
                        ? "text-destructive"
                        : alerta.tipo === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                  <p className="text-sm">{alerta.mensaje}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Clases de Hoy */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Clases de Hoy</CardTitle>
                <CardDescription>Viernes, 3 de Enero 2026</CardDescription>
              </div>
              <Badge variant="secondary">
                <CalendarCheck className="mr-1 h-3 w-3" />
                {clasesHoy.length} clases
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clasesHoy.map((clase, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">{clase.hora}</p>
                    </div>
                    <div>
                      <p className="font-medium">{clase.grupo}</p>
                      <p className="text-sm text-muted-foreground">
                        {clase.profesor} - {clase.aula}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{clase.alumnos} alumnos</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tareas Pendientes */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas de Hoy</CardTitle>
            <CardDescription>Pendientes de completar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tareasHoy.map((tarea, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <div>
                      <p className="font-medium">{tarea.tarea}</p>
                      <p className="text-sm text-muted-foreground">{tarea.hora}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      tarea.tipo === "comercial"
                        ? "default"
                        : tarea.tipo === "academico"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {tarea.tipo}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
