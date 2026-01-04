"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  GraduationCap,
  Calendar,
  Clock,
  UserPlus,
  CreditCard,
  MessageSquare,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { formatCurrency } from "@/lib/utils"

interface DashboardClientProps {
  kpiData: {
    alumnos: { total: number; activos: number; nuevos: number; tendencia: number }
    leads: { total: number; nuevos: number; conversion: number; tendencia: number }
    facturacion: { total: number; mes: number; pendiente: number; tendencia: number }
    clases: { hoy: number; semana: number; asistencia: number; tendencia: number }
  }
  leadsData: { mes: string; leads: number; conversiones: number }[]
  facturacionData: { mes: string; facturado: number; cobrado: number }[]
  alumnosPorNivel: { nivel: string; cantidad: number; color: string }[]
  clasesHoy: { hora: string; grupo: string; profesor: string; aula: string; alumnos: number }[]
  actividadReciente: { tipo: string; mensaje: string; tiempo: string }[]
  tareasPendientes: { titulo: string; prioridad: string; vence: string }[]
}

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  iconBg,
}: {
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  trend: number
  trendUp: boolean
  iconBg: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`rounded-lg p-3 ${iconBg}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}>
              {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trend}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  lead: UserPlus,
  matricula: GraduationCap,
  pago: CreditCard,
  ticket: MessageSquare,
  clase: BookOpen,
}

const priorityColors: Record<string, string> = {
  alta: "bg-red-100 text-red-800",
  media: "bg-yellow-100 text-yellow-800",
  baja: "bg-green-100 text-green-800",
}

export function DashboardClient({
  kpiData,
  leadsData,
  facturacionData,
  alumnosPorNivel,
  clasesHoy,
  actividadReciente,
  tareasPendientes,
}: DashboardClientProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al Sistema Integral LCidiomas
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Alumnos Activos"
          value={kpiData.alumnos.activos}
          subtitle={`${kpiData.alumnos.nuevos} nuevos este mes`}
          icon={Users}
          trend={kpiData.alumnos.tendencia}
          trendUp={true}
          iconBg="bg-blue-500"
        />
        <KPICard
          title="Leads"
          value={kpiData.leads.total}
          subtitle={`${kpiData.leads.conversion}% conversion`}
          icon={UserPlus}
          trend={kpiData.leads.tendencia}
          trendUp={true}
          iconBg="bg-green-500"
        />
        <KPICard
          title="Facturacion Mes"
          value={formatCurrency(kpiData.facturacion.mes)}
          subtitle={`${formatCurrency(kpiData.facturacion.pendiente)} pendiente`}
          icon={DollarSign}
          trend={kpiData.facturacion.tendencia}
          trendUp={true}
          iconBg="bg-purple-500"
        />
        <KPICard
          title="Clases Hoy"
          value={kpiData.clases.hoy}
          subtitle={`${kpiData.clases.asistencia}% asistencia`}
          icon={Calendar}
          trend={kpiData.clases.tendencia}
          trendUp={true}
          iconBg="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leads & Conversiones Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Leads y Conversiones</CardTitle>
            <CardDescription>Ultimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={leadsData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                  name="Leads"
                />
                <Area
                  type="monotone"
                  dataKey="conversiones"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorConv)"
                  name="Conversiones"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Facturacion Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Facturacion</CardTitle>
            <CardDescription>Facturado vs Cobrado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={facturacionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="facturado" fill="#8b5cf6" name="Facturado" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cobrado" fill="#22c55e" name="Cobrado" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alumnos por Nivel */}
        <Card>
          <CardHeader>
            <CardTitle>Alumnos por Nivel</CardTitle>
            <CardDescription>Distribucion actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={alumnosPorNivel}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="cantidad"
                >
                  {alumnosPorNivel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {alumnosPorNivel.map((item) => (
                <div key={item.nivel} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.nivel}: {item.cantidad}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clases Hoy */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Clases de Hoy</CardTitle>
              <CardDescription>{clasesHoy.length} clases programadas</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[280px]">
              <div className="space-y-1 p-4 pt-0">
                {clasesHoy.map((clase, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[50px]">
                        <p className="font-bold text-sm">{clase.hora}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{clase.grupo}</p>
                        <p className="text-xs text-muted-foreground">{clase.profesor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {clase.aula}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {clase.alumnos} alumnos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tareas Pendientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tareas Pendientes</CardTitle>
              <CardDescription>{tareasPendientes.length} tareas</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Ver todas <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[280px]">
              <div className="space-y-1 p-4 pt-0">
                {tareasPendientes.map((tarea, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{tarea.titulo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={priorityColors[tarea.prioridad]}>
                        {tarea.prioridad}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{tarea.vence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Ultimas acciones en el sistema</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver historial completo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {actividadReciente.map((actividad, idx) => {
              const ActivityIcon = activityIcons[actividad.tipo] || AlertCircle
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="rounded-full bg-muted p-2">
                    <ActivityIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{actividad.mensaje}</p>
                    <p className="text-xs text-muted-foreground">{actividad.tiempo}</p>
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
