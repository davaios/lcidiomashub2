"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

const leadSchema = z.object({
  nombre: z.string().min(1, "Nombre es requerido"),
  apellidos: z.string().min(1, "Apellidos son requeridos"),
  email: z.string().email("Email invalido"),
  telefono: z.string().optional(),
  segmento: z.string().min(1, "Segmento es requerido"),
  origen: z.string().min(1, "Origen es requerido"),
  idiomaInteres: z.string().optional(),
  horarioPreferido: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Partial<LeadFormData>
  onSubmit: (data: LeadFormData) => Promise<void>
  mode?: "create" | "edit"
}

const segmentos = [
  { value: "ADULTO_PARTICULAR", label: "Adulto Particular" },
  { value: "NINO_PARTICULAR", label: "Nino Particular" },
  { value: "EMPRESA", label: "Empresa" },
  { value: "COLEGIO", label: "Colegio" },
]

const origenes = [
  { value: "WEB_ORGANICO", label: "Web Organico" },
  { value: "GOOGLE_ADS", label: "Google Ads" },
  { value: "META_ADS", label: "Meta Ads" },
  { value: "REFERIDO", label: "Referido" },
  { value: "LLAMADA_ENTRANTE", label: "Llamada Entrante" },
]

export function LeadDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  mode = "create",
}: LeadDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      segmento: "ADULTO_PARTICULAR",
      origen: "WEB_ORGANICO",
      ...initialData,
    },
  })

  const handleFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset()
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Nuevo Lead" : "Editar Lead"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa los datos para registrar un nuevo lead"
              : "Modifica los datos del lead"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                {...register("nombre")}
                placeholder="Nombre"
              />
              {errors.nombre && (
                <p className="text-xs text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                {...register("apellidos")}
                placeholder="Apellidos"
              />
              {errors.apellidos && (
                <p className="text-xs text-red-500">{errors.apellidos.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@ejemplo.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                {...register("telefono")}
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="segmento">Segmento *</Label>
              <select
                id="segmento"
                {...register("segmento")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {segmentos.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origen">Origen *</Label>
              <select
                id="origen"
                {...register("origen")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {origenes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idiomaInteres">Idioma de interes</Label>
              <select
                id="idiomaInteres"
                {...register("idiomaInteres")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar</option>
                <option value="Ingles">Ingles</option>
                <option value="Aleman">Aleman</option>
                <option value="Frances">Frances</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horarioPreferido">Horario preferido</Label>
              <select
                id="horarioPreferido"
                {...register("horarioPreferido")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar</option>
                <option value="Manana">Manana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "create" ? "Crear Lead" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
