"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Phone,
  Mail,
  MoreVertical,
  Calendar,
  Building2,
  User,
  TrendingUp,
} from "lucide-react"
import { formatCurrency, getInitials } from "@/lib/utils"

interface Lead {
  id: string
  nombre: string
  empresa: string | null
  email: string
  telefono: string
  estado: string
  temperatura: string
  score: number
  idiomaInteres: string
  valorEstimado: number
  comercial: string | null
  proximoContacto: string | null
}

const pipelineStages = [
  { key: "NUEVO", label: "Nuevo", color: "bg-gray-500" },
  { key: "CONTACTADO", label: "Contactado", color: "bg-blue-500" },
  { key: "TEST_REALIZADO", label: "Test Realizado", color: "bg-yellow-500" },
  { key: "PROPUESTA_ENVIADA", label: "Propuesta", color: "bg-purple-500" },
  { key: "NEGOCIACION", label: "Negociacion", color: "bg-orange-500" },
]

const temperaturaColors: Record<string, string> = {
  FRIO: "border-blue-300 bg-blue-50",
  TIBIO: "border-yellow-300 bg-yellow-50",
  CALIENTE: "border-orange-300 bg-orange-50",
  MUY_CALIENTE: "border-red-300 bg-red-50",
}

function LeadCard({ lead }: { lead: Lead }) {
  const initials = lead.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)

  return (
    <Card className={`mb-3 border-l-4 ${temperaturaColors[lead.temperatura] || ""}`}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{lead.nombre}</p>
              {lead.empresa && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {lead.empresa}
                </p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Enviar email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Programar cita
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{lead.idiomaInteres}</span>
            <Badge variant="outline" className="text-xs">
              Score: {lead.score}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-600">
              {formatCurrency(lead.valorEstimado)}
            </span>
            {lead.comercial && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {lead.comercial.split(" ")[0]}
              </span>
            )}
          </div>

          {lead.proximoContacto && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Proximo: {new Date(lead.proximoContacto).toLocaleDateString("es-ES")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function PipelineClient({ leads }: { leads: Lead[] }) {
  // Group leads by stage
  const leadsByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage.key] = leads.filter((lead) => lead.estado === stage.key)
    return acc
  }, {} as Record<string, Lead[]>)

  // Calculate totals per stage
  const stageTotals = pipelineStages.reduce((acc, stage) => {
    acc[stage.key] = leadsByStage[stage.key].reduce(
      (sum, lead) => sum + lead.valorEstimado,
      0
    )
    return acc
  }, {} as Record<string, number>)

  const totalPipeline = Object.values(stageTotals).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipeline Comercial</h1>
          <p className="text-muted-foreground">
            Visualiza y gestiona el embudo de ventas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Valor Total Pipeline</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPipeline)}
            </p>
          </div>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Ver Forecast
          </Button>
        </div>
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => (
          <div key={stage.key} className="flex-shrink-0 w-72">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                    <CardTitle className="text-sm font-medium">
                      {stage.label}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary">
                    {leadsByStage[stage.key].length}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-green-600">
                  {formatCurrency(stageTotals[stage.key])}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  {leadsByStage[stage.key].map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                  {leadsByStage[stage.key].length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-8">
                      No hay leads en esta etapa
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        {pipelineStages.map((stage) => (
          <Card key={stage.key}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                <span className="text-sm font-medium">{stage.label}</span>
              </div>
              <div className="text-2xl font-bold">
                {leadsByStage[stage.key].length}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(stageTotals[stage.key])}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
