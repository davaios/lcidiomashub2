"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const leadSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  apellidos: z.string().min(1, "Apellidos son requeridos"),
  email: z.string().email("Email invalido"),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  segmento: z.enum([
    "ADULTO_PARTICULAR",
    "NINO_PARTICULAR",
    "EMPRESA",
    "COLEGIO",
    "ERASMUS",
    "CAMPAMENTO",
  ]),
  origen: z.enum([
    "WEB_ORGANICO",
    "GOOGLE_ADS",
    "META_ADS",
    "REFERIDO",
    "LLAMADA_ENTRANTE",
    "VISITA_PRESENCIAL",
    "EVENTO",
    "COLEGIO",
    "EMPRESA",
    "OTRO",
  ]),
  idiomaInteres: z.string().optional(),
  horarioPreferido: z.string().optional(),
  objetivos: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadFormProps {
  initialData?: Partial<LeadFormData>
  onSubmit: (data: LeadFormData) => Promise<void>
  onCancel?: () => void
  isEditing?: boolean
}

const segmentos = [
  { value: "ADULTO_PARTICULAR", label: "Adulto Particular" },
  { value: "NINO_PARTICULAR", label: "Nino Particular" },
  { value: "EMPRESA", label: "Empresa" },
  { value: "COLEGIO", label: "Colegio" },
  { value: "ERASMUS", label: "Erasmus" },
  { value: "CAMPAMENTO", label: "Campamento" },
]

const origenes = [
  { value: "WEB_ORGANICO", label: "Web Organico" },
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "REFERIDO", label: "Referido" },
  { value: "LLAMADA_ENTRANTE", label: "Llamada Entrante" },
  { value: "VISITA_PRESENCIAL", label: "Visita Presencial" },
  { value: "EVENTO", label: "Evento" },
  { value: "COLEGIO", label: "Colegio" },
  { value: "EMPRESA", label: "Empresa" },
  { value: "OTRO", label: "Otro" },
]

export function LeadForm({ initialData, onSubmit, onCancel, isEditing = false }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      segmento: "ADULTO_PARTICULAR",
      origen: "WEB_ORGANICO",
      ...initialData,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Lead" : "Nuevo Lead"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Modifica los datos del lead"
            : "Completa los datos para registrar un nuevo lead"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                {...register("nombre")}
                placeholder="Nombre"
              />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                {...register("apellidos")}
                placeholder="Apellidos"
              />
              {errors.apellidos && (
                <p className="text-sm text-red-500">{errors.apellidos.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@ejemplo.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Telefono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                {...register("telefono")}
                placeholder="+34 600 000 000"
              />
            </div>

            {/* Segmento */}
            <div className="space-y-2">
              <Label htmlFor="segmento">Segmento *</Label>
              <select
                id="segmento"
                {...register("segmento")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {segmentos.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {errors.segmento && (
                <p className="text-sm text-red-500">{errors.segmento.message}</p>
              )}
            </div>

            {/* Origen */}
            <div className="space-y-2">
              <Label htmlFor="origen">Origen *</Label>
              <select
                id="origen"
                {...register("origen")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {origenes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {errors.origen && (
                <p className="text-sm text-red-500">{errors.origen.message}</p>
              )}
            </div>

            {/* Empresa */}
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                {...register("empresa")}
                placeholder="Nombre de la empresa"
              />
            </div>

            {/* Idioma de interes */}
            <div className="space-y-2">
              <Label htmlFor="idiomaInteres">Idioma de interes</Label>
              <select
                id="idiomaInteres"
                {...register("idiomaInteres")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Seleccionar idioma</option>
                <option value="Ingles">Ingles</option>
                <option value="Aleman">Aleman</option>
                <option value="Frances">Frances</option>
                <option value="Italiano">Italiano</option>
                <option value="Portugues">Portugues</option>
                <option value="Chino">Chino</option>
              </select>
            </div>

            {/* Horario preferido */}
            <div className="space-y-2">
              <Label htmlFor="horarioPreferido">Horario preferido</Label>
              <select
                id="horarioPreferido"
                {...register("horarioPreferido")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Seleccionar horario</option>
                <option value="Manana">Manana (9:00 - 14:00)</option>
                <option value="Tarde">Tarde (15:00 - 19:00)</option>
                <option value="Noche">Noche (19:00 - 21:00)</option>
                <option value="Fines de semana">Fines de semana</option>
              </select>
            </div>
          </div>

          {/* Objetivos */}
          <div className="space-y-2">
            <Label htmlFor="objetivos">Objetivos / Notas</Label>
            <textarea
              id="objetivos"
              {...register("objetivos")}
              placeholder="Objetivos del alumno o notas adicionales..."
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Guardar Cambios" : "Crear Lead"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
