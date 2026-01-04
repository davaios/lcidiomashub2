import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Reportes",
}

// Mock data
const reportesDisponibles = [
  {
    id: "1",
    nombre: "Informe de Facturacion Mensual",
    descripcion: "Resumen de facturacion, cobros y pendientes del mes",
    categoria: "FINANZAS",
    frecuencia: "Mensual",
    ultimaGeneracion: "2026-01-01",
    icon: DollarSign,
  },
  {
    id: "2",
    nombre: "Analisis de Leads y Conversiones",
    descripcion: "Metricas de captacion, conversion y ROI por canal",
    categoria: "COMERCIAL",
    frecuencia: "Semanal",
    ultimaGeneracion: "2025-12-30",
    icon: TrendingUp,
  },
  {
    id: "3",
    nombre: "Asistencia y Rendimiento Academico",
    descripcion: "Estadisticas de asistencia, evaluaciones y progreso",
    categoria: "ACADEMICO",
    frecuencia: "Mensual",
    ultimaGeneracion: "2026-01-01",
    icon: GraduationCap,
  },
  {
    id: "4",
    nombre: "Ocupacion de Grupos",
    descripcion: "Analisis de plazas ocupadas vs disponibles por sede",
    categoria: "ACADEMICO",
    frecuencia: "Semanal",
    ultimaGeneracion: "2025-12-30",
    icon: Users,
  },
  {
    id: "5",
    nombre: "Satisfaccion de Alumnos (NPS)",
    descripcion: "Resultados de encuestas y Net Promoter Score",
    categoria: "CALIDAD",
    frecuencia: "Trimestral",
    ultimaGeneracion: "2025-12-15",
    icon: BarChart3,
  },
  {
    id: "6",
    nombre: "Rendimiento de Profesores",
    descripcion: "Evaluaciones, valoraciones y metricas docentes",
    categoria: "RRHH",
    frecuencia: "Trimestral",
    ultimaGeneracion: "2025-12-15",
    icon: Users,
  },
  {
    id: "7",
    nombre: "Tickets y Tiempo de Respuesta",
    descripcion: "Analisis de incidencias, tiempos y satisfaccion",
    categoria: "ATENCION",
    frecuencia: "Semanal",
    ultimaGeneracion: "2025-12-30",
    icon: LineChart,
  },
  {
    id: "8",
    nombre: "Dashboard Ejecutivo",
    descripcion: "Resumen de KPIs principales para direccion",
    categoria: "DIRECCION",
    frecuencia: "Diario",
    ultimaGeneracion: "2026-01-03",
    icon: PieChart,
  },
]

const categoriaConfig: Record<string, { color: string }> = {
  FINANZAS: { color: "bg-green-100 text-green-800" },
  COMERCIAL: { color: "bg-blue-100 text-blue-800" },
  ACADEMICO: { color: "bg-purple-100 text-purple-800" },
  CALIDAD: { color: "bg-yellow-100 text-yellow-800" },
  RRHH: { color: "bg-pink-100 text-pink-800" },
  ATENCION: { color: "bg-orange-100 text-orange-800" },
  DIRECCION: { color: "bg-red-100 text-red-800" },
}

const reportesRecientes = [
  { nombre: "Facturacion Diciembre 2025", fecha: "2026-01-01", formato: "PDF" },
  { nombre: "Leads Q4 2025", fecha: "2025-12-31", formato: "Excel" },
  { nombre: "NPS Q4 2025", fecha: "2025-12-15", formato: "PDF" },
  { nombre: "Dashboard Ejecutivo Dic", fecha: "2025-12-31", formato: "PDF" },
]

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reportes</h1>
          <p className="text-muted-foreground">
            Generacion y descarga de informes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Programar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{reportesDisponibles.length}</div>
                <p className="text-sm text-muted-foreground">Tipos de Reportes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <p className="text-sm text-muted-foreground">Generados Este Mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Programados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">7</div>
                <p className="text-sm text-muted-foreground">Categorias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reportes Disponibles */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Disponibles</CardTitle>
              <CardDescription>
                Selecciona un reporte para generar o programar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {reportesDisponibles.map((reporte) => {
                  const Icon = reporte.icon
                  return (
                    <Card key={reporte.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`rounded-lg p-2 ${categoriaConfig[reporte.categoria]?.color.split(" ")[0]}`}>
                            <Icon className={`h-5 w-5 ${categoriaConfig[reporte.categoria]?.color.split(" ")[1]}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{reporte.nombre}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {reporte.descripcion}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={categoriaConfig[reporte.categoria]?.color} variant="secondary">
                                {reporte.categoria}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {reporte.frecuencia}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Excel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reportes Recientes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Reportes Recientes</CardTitle>
              <CardDescription>
                Ultimos reportes generados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportesRecientes.map((reporte, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{reporte.nombre}</p>
                        <p className="text-xs text-muted-foreground">{reporte.fecha}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
