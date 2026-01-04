import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
  BarChart3,
  PieChart,
  Mail,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Informes Direccion",
}

// Mock data
const informesEjecutivos = [
  {
    id: "1",
    titulo: "Informe Mensual Direccion",
    descripcion: "Resumen ejecutivo de todos los departamentos",
    periodicidad: "Mensual",
    ultimaGeneracion: "2026-01-01",
    estado: "GENERADO",
    destinatarios: ["CEO", "COO", "CFO"],
    secciones: ["KPIs", "Finanzas", "Comercial", "Academico", "RRHH"],
  },
  {
    id: "2",
    titulo: "Dashboard Semanal",
    descripcion: "Metricas clave de la semana",
    periodicidad: "Semanal",
    ultimaGeneracion: "2025-12-30",
    estado: "GENERADO",
    destinatarios: ["Direccion", "Jefes de Area"],
    secciones: ["Ventas", "Matriculas", "Incidencias"],
  },
  {
    id: "3",
    titulo: "Analisis Financiero Q4",
    descripcion: "Cierre trimestral con proyecciones",
    periodicidad: "Trimestral",
    ultimaGeneracion: "2025-12-31",
    estado: "GENERADO",
    destinatarios: ["CFO", "CEO", "Consejo"],
    secciones: ["P&L", "Cash Flow", "Proyecciones", "Riesgos"],
  },
  {
    id: "4",
    titulo: "Plan Estrategico 2026",
    descripcion: "Objetivos y estrategia anual",
    periodicidad: "Anual",
    ultimaGeneracion: "2025-12-20",
    estado: "BORRADOR",
    destinatarios: ["Comite Direccion"],
    secciones: ["Vision", "Objetivos", "Inversiones", "Roadmap"],
  },
]

const informesProgramados = [
  {
    titulo: "Informe Mensual Enero",
    fechaProgramada: "2026-02-01",
    hora: "08:00",
    destinatarios: 5,
  },
  {
    titulo: "Dashboard Semanal",
    fechaProgramada: "2026-01-06",
    hora: "09:00",
    destinatarios: 8,
  },
  {
    titulo: "NPS Trimestral Q1",
    fechaProgramada: "2026-04-01",
    hora: "10:00",
    destinatarios: 12,
  },
]

const metricas = [
  {
    titulo: "Informes Generados",
    valor: 48,
    subtitulo: "Este trimestre",
    icon: FileText,
    color: "blue",
  },
  {
    titulo: "Tiempo Promedio",
    valor: "2.5min",
    subtitulo: "Generacion",
    icon: Clock,
    color: "green",
  },
  {
    titulo: "Destinatarios",
    valor: 156,
    subtitulo: "Usuarios unicos",
    icon: Users,
    color: "purple",
  },
  {
    titulo: "Descargas",
    valor: 324,
    subtitulo: "Este mes",
    icon: Download,
    color: "orange",
  },
]

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
  }
  return colors[color] || colors.blue
}

export default function InformesDireccionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Informes Direccion</h1>
          <p className="text-muted-foreground">
            Informes ejecutivos y de gestion
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Programar
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Nuevo Informe
          </Button>
        </div>
      </div>

      {/* Metricas */}
      <div className="grid gap-4 md:grid-cols-4">
        {metricas.map((metrica, idx) => {
          const Icon = metrica.icon
          const colors = getColorClasses(metrica.color)
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full ${colors.bg} p-2`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{metrica.valor}</div>
                    <p className="text-sm text-muted-foreground">{metrica.titulo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informes Ejecutivos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Informes Ejecutivos</CardTitle>
                  <CardDescription>Informes de alto nivel para direccion</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {informesEjecutivos.map((informe) => (
                  <Card key={informe.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{informe.titulo}</h3>
                            <Badge
                              className={
                                informe.estado === "GENERADO"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {informe.estado === "GENERADO" ? (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {informe.estado}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {informe.descripcion}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {informe.secciones.map((seccion, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {seccion}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {informe.periodicidad}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {informe.ultimaGeneracion}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {informe.destinatarios.length} destinatarios
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Programados */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Programados</CardTitle>
                  <CardDescription>Proximos informes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {informesProgramados.map((informe, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{informe.titulo}</p>
                      <p className="text-xs text-muted-foreground">
                        {informe.fechaProgramada} a las {informe.hora}
                      </p>
                    </div>
                    <Badge variant="outline">{informe.destinatarios}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acceso Rapido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acceso Rapido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Dashboard", icon: PieChart, color: "blue" },
                  { label: "Finanzas", icon: DollarSign, color: "green" },
                  { label: "Comercial", icon: TrendingUp, color: "purple" },
                  { label: "Academico", icon: GraduationCap, color: "orange" },
                ].map((item, idx) => {
                  const Icon = item.icon
                  const colors = getColorClasses(item.color)
                  return (
                    <Button key={idx} variant="outline" className="h-auto py-3 flex-col gap-2">
                      <div className={`rounded-lg ${colors.bg} p-2`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Este Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generados</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Enviados</span>
                  <span className="font-medium">10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pendientes</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tasa Apertura</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
