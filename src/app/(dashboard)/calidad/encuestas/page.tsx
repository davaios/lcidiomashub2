import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  ClipboardList,
  Star,
  Users,
  TrendingUp,
  Send,
  Eye,
  BarChart3,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Encuestas",
}

// Mock data
const encuestas = [
  {
    id: "1",
    nombre: "Satisfaccion General Q4 2025",
    tipo: "SATISFACCION",
    estado: "ACTIVA",
    preguntas: 12,
    respuestas: 156,
    tasaRespuesta: 72,
    nps: 67,
    fechaInicio: "2025-12-01",
    fechaFin: "2026-01-15",
  },
  {
    id: "2",
    nombre: "Evaluacion Profesor - Maria Garcia",
    tipo: "PROFESOR",
    estado: "ACTIVA",
    preguntas: 8,
    respuestas: 24,
    tasaRespuesta: 85,
    nps: 78,
    fechaInicio: "2025-12-15",
    fechaFin: "2026-01-31",
  },
  {
    id: "3",
    nombre: "Onboarding Nuevos Alumnos",
    tipo: "ONBOARDING",
    estado: "ACTIVA",
    preguntas: 6,
    respuestas: 18,
    tasaRespuesta: 90,
    nps: 72,
    fechaInicio: "2025-01-01",
    fechaFin: null,
  },
  {
    id: "4",
    nombre: "Fin de Curso B1 Septiembre",
    tipo: "FIN_CURSO",
    estado: "FINALIZADA",
    preguntas: 10,
    respuestas: 42,
    tasaRespuesta: 88,
    nps: 71,
    fechaInicio: "2025-09-15",
    fechaFin: "2025-09-30",
  },
  {
    id: "5",
    nombre: "NPS Trimestral Q3",
    tipo: "NPS",
    estado: "FINALIZADA",
    preguntas: 3,
    respuestas: 198,
    tasaRespuesta: 65,
    nps: 64,
    fechaInicio: "2025-10-01",
    fechaFin: "2025-10-15",
  },
  {
    id: "6",
    nombre: "Clima Laboral 2025",
    tipo: "CLIMA_LABORAL",
    estado: "BORRADOR",
    preguntas: 20,
    respuestas: 0,
    tasaRespuesta: 0,
    nps: null,
    fechaInicio: null,
    fechaFin: null,
  },
]

const tipoConfig: Record<string, { color: string; label: string }> = {
  SATISFACCION: { color: "bg-blue-100 text-blue-800", label: "Satisfaccion" },
  NPS: { color: "bg-green-100 text-green-800", label: "NPS" },
  ONBOARDING: { color: "bg-purple-100 text-purple-800", label: "Onboarding" },
  FIN_CURSO: { color: "bg-yellow-100 text-yellow-800", label: "Fin de Curso" },
  PROFESOR: { color: "bg-cyan-100 text-cyan-800", label: "Profesor" },
  CLIMA_LABORAL: { color: "bg-pink-100 text-pink-800", label: "Clima Laboral" },
}

const estadoConfig: Record<string, { color: string; label: string }> = {
  BORRADOR: { color: "bg-gray-100 text-gray-800", label: "Borrador" },
  ACTIVA: { color: "bg-green-100 text-green-800", label: "Activa" },
  FINALIZADA: { color: "bg-blue-100 text-blue-800", label: "Finalizada" },
}

function getNPSColor(nps: number | null) {
  if (nps === null) return "text-gray-400"
  if (nps >= 70) return "text-green-600"
  if (nps >= 50) return "text-yellow-600"
  return "text-red-600"
}

export default function EncuestasPage() {
  // Stats
  const activas = encuestas.filter((e) => e.estado === "ACTIVA").length
  const totalRespuestas = encuestas.reduce((acc, e) => acc + e.respuestas, 0)
  const npsPromedio = encuestas
    .filter((e) => e.nps !== null)
    .reduce((acc, e, _, arr) => acc + (e.nps || 0) / arr.length, 0)
  const tasaPromedioRespuesta = encuestas
    .filter((e) => e.respuestas > 0)
    .reduce((acc, e, _, arr) => acc + e.tasaRespuesta / arr.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Encuestas</h1>
          <p className="text-muted-foreground">
            Gestion de encuestas de satisfaccion y NPS
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Encuesta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <ClipboardList className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activas}</div>
                <p className="text-sm text-muted-foreground">Encuestas Activas</p>
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
                <div className="text-2xl font-bold">{totalRespuestas}</div>
                <p className="text-sm text-muted-foreground">Total Respuestas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round(npsPromedio)}</div>
                <p className="text-sm text-muted-foreground">NPS Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round(tasaPromedioRespuesta)}%</div>
                <p className="text-sm text-muted-foreground">Tasa de Respuesta</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Encuestas Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {encuestas.map((encuesta) => (
          <Card key={encuesta.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{encuesta.nombre}</CardTitle>
                  <CardDescription className="mt-1">
                    {encuesta.preguntas} preguntas
                  </CardDescription>
                </div>
                <Badge className={estadoConfig[encuesta.estado]?.color}>
                  {estadoConfig[encuesta.estado]?.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tipo */}
                <Badge className={tipoConfig[encuesta.tipo]?.color}>
                  {tipoConfig[encuesta.tipo]?.label}
                </Badge>

                {/* Metricas */}
                {encuesta.estado !== "BORRADOR" && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xl font-bold">{encuesta.respuestas}</p>
                      <p className="text-xs text-muted-foreground">Respuestas</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{encuesta.tasaRespuesta}%</p>
                      <p className="text-xs text-muted-foreground">Tasa</p>
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${getNPSColor(encuesta.nps)}`}>
                        {encuesta.nps ?? "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">NPS</p>
                    </div>
                  </div>
                )}

                {/* Fechas */}
                {encuesta.fechaInicio && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    {encuesta.fechaFin
                      ? `${encuesta.fechaInicio} - ${encuesta.fechaFin}`
                      : `Desde ${encuesta.fechaInicio}`}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {encuesta.estado === "BORRADOR" && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        Editar
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Send className="h-3 w-3 mr-1" />
                        Enviar
                      </Button>
                    </>
                  )}
                  {encuesta.estado === "ACTIVA" && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Resultados
                      </Button>
                    </>
                  )}
                  {encuesta.estado === "FINALIZADA" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Ver Resultados
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
