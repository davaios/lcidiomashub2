import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  DollarSign,
  Target,
  Star,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react"

export const metadata: Metadata = {
  title: "KPIs Direccion",
}

// Mock KPIs data
const kpisGenerales = [
  {
    titulo: "Alumnos Activos",
    valor: 847,
    cambio: 12.5,
    tendencia: "up",
    objetivo: 900,
    periodo: "Este mes",
    icon: GraduationCap,
    color: "blue",
  },
  {
    titulo: "Ingresos Mensuales",
    valor: 156780,
    formato: "currency",
    cambio: 8.2,
    tendencia: "up",
    objetivo: 175000,
    periodo: "Enero 2026",
    icon: DollarSign,
    color: "green",
  },
  {
    titulo: "Tasa de Conversion",
    valor: 38.5,
    formato: "percent",
    cambio: -2.1,
    tendencia: "down",
    objetivo: 45,
    periodo: "Leads a Alumnos",
    icon: Target,
    color: "purple",
  },
  {
    titulo: "NPS",
    valor: 67,
    cambio: 3,
    tendencia: "up",
    objetivo: 75,
    periodo: "Q4 2025",
    icon: Star,
    color: "yellow",
  },
  {
    titulo: "Profesores Activos",
    valor: 32,
    cambio: 0,
    tendencia: "neutral",
    objetivo: 35,
    periodo: "Este mes",
    icon: Users,
    color: "cyan",
  },
  {
    titulo: "Tiempo Resp. Tickets",
    valor: 2.4,
    formato: "hours",
    cambio: -15,
    tendencia: "up",
    objetivo: 2,
    periodo: "Promedio",
    icon: Clock,
    color: "orange",
  },
]

const kpisPorDepartamento = [
  {
    departamento: "Comercial",
    kpis: [
      { nombre: "Leads Generados", valor: 145, objetivo: 150, cumplimiento: 96.7 },
      { nombre: "Demos Realizadas", valor: 48, objetivo: 50, cumplimiento: 96 },
      { nombre: "Cierres", valor: 28, objetivo: 35, cumplimiento: 80 },
    ],
  },
  {
    departamento: "Academico",
    kpis: [
      { nombre: "Asistencia Media", valor: 87.5, objetivo: 90, cumplimiento: 97.2 },
      { nombre: "Grupos Activos", valor: 68, objetivo: 70, cumplimiento: 97.1 },
      { nombre: "Aprobados Tests", valor: 92, objetivo: 85, cumplimiento: 108.2 },
    ],
  },
  {
    departamento: "Finanzas",
    kpis: [
      { nombre: "Cobro (EUR)", valor: 148500, objetivo: 160000, cumplimiento: 92.8 },
      { nombre: "Morosidad", valor: 3.2, objetivo: 5, cumplimiento: 156.3 },
      { nombre: "ARPU", valor: 185, objetivo: 180, cumplimiento: 102.8 },
    ],
  },
  {
    departamento: "Atencion",
    kpis: [
      { nombre: "Tickets Resueltos", valor: 234, objetivo: 220, cumplimiento: 106.4 },
      { nombre: "Satisfaccion", valor: 4.6, objetivo: 4.5, cumplimiento: 102.2 },
      { nombre: "Tiempo Respuesta (h)", valor: 2.4, objetivo: 2, cumplimiento: 83.3 },
    ],
  },
]

function formatValue(value: number, format?: string) {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value)
    case "percent":
      return `${value}%`
    case "hours":
      return `${value}h`
    default:
      return value.toLocaleString("es-ES")
  }
}

function getColorClasses(color: string) {
  const colors: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-800", icon: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-800", icon: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-800", icon: "text-purple-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "text-yellow-600" },
    cyan: { bg: "bg-cyan-100", text: "text-cyan-800", icon: "text-cyan-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-800", icon: "text-orange-600" },
  }
  return colors[color] || colors.blue
}

function getCumplimientoColor(cumplimiento: number) {
  if (cumplimiento >= 100) return "text-green-600"
  if (cumplimiento >= 80) return "text-yellow-600"
  return "text-red-600"
}

export default function KPIsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">KPIs Direccion</h1>
          <p className="text-muted-foreground">
            Indicadores clave de rendimiento del negocio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Enero 2026
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpisGenerales.map((kpi, idx) => {
          const Icon = kpi.icon
          const colors = getColorClasses(kpi.color)
          const progreso = (kpi.valor / kpi.objetivo) * 100

          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg ${colors.bg} p-2`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <Badge
                    className={
                      kpi.tendencia === "up"
                        ? "bg-green-100 text-green-800"
                        : kpi.tendencia === "down"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {kpi.tendencia === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : kpi.tendencia === "down" ? (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    ) : null}
                    {kpi.cambio > 0 ? "+" : ""}{kpi.cambio}%
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{kpi.titulo}</p>
                  <p className="text-3xl font-bold mt-1">
                    {formatValue(kpi.valor, kpi.formato)}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{kpi.periodo}</span>
                    <span>Obj: {formatValue(kpi.objetivo, kpi.formato)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg.replace("100", "500")} rounded-full transition-all`}
                      style={{ width: `${Math.min(progreso, 100)}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${getCumplimientoColor(progreso)}`}>
                    {progreso.toFixed(1)}% del objetivo
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* KPIs por Departamento */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>KPIs por Departamento</CardTitle>
              <CardDescription>Rendimiento detallado por area</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {kpisPorDepartamento.map((dept, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{dept.departamento}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dept.kpis.map((kpi, kpiIdx) => (
                      <div key={kpiIdx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{kpi.nombre}</span>
                          <span className="font-medium">
                            {typeof kpi.valor === "number" && kpi.valor > 1000
                              ? kpi.valor.toLocaleString("es-ES")
                              : kpi.valor}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                kpi.cumplimiento >= 100
                                  ? "bg-green-500"
                                  : kpi.cumplimiento >= 80
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(kpi.cumplimiento, 100)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getCumplimientoColor(kpi.cumplimiento)}`}>
                            {kpi.cumplimiento.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tendencias */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Mejoras Este Mes</CardTitle>
                <CardDescription>KPIs con tendencia positiva</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { nombre: "Alumnos Nuevos", mejora: "+15 vs mes anterior" },
                { nombre: "NPS", mejora: "+3 puntos" },
                { nombre: "Tickets Resueltos", mejora: "+14 resueltos" },
                { nombre: "Tasa Aprobados", mejora: "+2.5% sobre objetivo" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                  <span className="text-sm font-medium">{item.nombre}</span>
                  <Badge className="bg-green-100 text-green-800">{item.mejora}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Areas de Mejora</CardTitle>
                <CardDescription>KPIs que requieren atencion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { nombre: "Tasa de Conversion", problema: "-2.1% vs objetivo" },
                { nombre: "Tiempo Respuesta", problema: "+0.4h sobre objetivo" },
                { nombre: "Cobros Pendientes", problema: "8.2% pendiente" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                  <span className="text-sm font-medium">{item.nombre}</span>
                  <Badge className="bg-red-100 text-red-800">{item.problema}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
