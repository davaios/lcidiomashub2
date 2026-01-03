"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

const alumnoSchema = z.object({
  // User data
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Password debe tener al menos 8 caracteres"),
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellidos son requeridos"),
  phone: z.string().optional(),
  sedeId: z.string().min(1, "Sede es requerida"),

  // Alumno data
  nivelActual: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
  idiomasPrincipal: z.array(z.string()).default(["Ingles"]),
  fechaNacimiento: z.string().optional(),
  nacionalidad: z.string().optional(),
  documentoTipo: z.enum(["DNI", "NIE", "PASAPORTE", "OTRO"]).optional(),
  documentoNumero: z.string().optional(),

  // Tutor data (for minors)
  esMenor: z.boolean().default(false),
  tutorNombre: z.string().optional(),
  tutorTelefono: z.string().optional(),
  tutorEmail: z.string().email().optional().or(z.literal("")),
  tutorRelacion: z.string().optional(),
})

type AlumnoFormData = z.infer<typeof alumnoSchema>

interface AlumnoFormProps {
  initialData?: Partial<AlumnoFormData>
  sedes: { id: string; nombre: string }[]
  onSubmit: (data: AlumnoFormData) => Promise<void>
  onCancel?: () => void
  isEditing?: boolean
}

const niveles = [
  { value: "A1", label: "A1 - Principiante" },
  { value: "A2", label: "A2 - Elemental" },
  { value: "B1", label: "B1 - Intermedio" },
  { value: "B2", label: "B2 - Intermedio Alto" },
  { value: "C1", label: "C1 - Avanzado" },
  { value: "C2", label: "C2 - Maestria" },
]

const tiposDocumento = [
  { value: "DNI", label: "DNI" },
  { value: "NIE", label: "NIE" },
  { value: "PASAPORTE", label: "Pasaporte" },
  { value: "OTRO", label: "Otro" },
]

export function AlumnoForm({ initialData, sedes, onSubmit, onCancel, isEditing = false }: AlumnoFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlumnoFormData>({
    resolver: zodResolver(alumnoSchema),
    defaultValues: {
      idiomasPrincipal: ["Ingles"],
      esMenor: false,
      ...initialData,
    },
  })

  const esMenor = watch("esMenor")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Alumno" : "Nuevo Alumno"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Modifica los datos del alumno"
            : "Completa los datos para registrar un nuevo alumno"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Datos de acceso */}
          <div>
            <h3 className="text-lg font-medium mb-4">Datos de acceso</h3>
            <div className="grid gap-4 md:grid-cols-2">
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

              {!isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Minimo 8 caracteres"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Datos personales */}
          <div>
            <h3 className="text-lg font-medium mb-4">Datos personales</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Nombre"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Apellidos"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+34 600 000 000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  {...register("fechaNacimiento")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentoTipo">Tipo de documento</Label>
                <select
                  id="documentoTipo"
                  {...register("documentoTipo")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Seleccionar</option>
                  {tiposDocumento.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentoNumero">Numero de documento</Label>
                <Input
                  id="documentoNumero"
                  {...register("documentoNumero")}
                  placeholder="12345678A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nacionalidad">Nacionalidad</Label>
                <Input
                  id="nacionalidad"
                  {...register("nacionalidad")}
                  placeholder="Espana"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Datos academicos */}
          <div>
            <h3 className="text-lg font-medium mb-4">Datos academicos</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sedeId">Sede *</Label>
                <select
                  id="sedeId"
                  {...register("sedeId")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Seleccionar sede</option>
                  {sedes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
                {errors.sedeId && (
                  <p className="text-sm text-red-500">{errors.sedeId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nivelActual">Nivel actual</Label>
                <select
                  id="nivelActual"
                  {...register("nivelActual")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Seleccionar nivel</option>
                  {niveles.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Menor de edad */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="esMenor"
                {...register("esMenor")}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="esMenor" className="text-lg font-medium">
                Es menor de edad
              </Label>
            </div>

            {esMenor && (
              <div className="grid gap-4 md:grid-cols-2 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="tutorNombre">Nombre del tutor *</Label>
                  <Input
                    id="tutorNombre"
                    {...register("tutorNombre")}
                    placeholder="Nombre completo del tutor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorRelacion">Relacion</Label>
                  <select
                    id="tutorRelacion"
                    {...register("tutorRelacion")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Tutor legal">Tutor legal</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorTelefono">Telefono del tutor *</Label>
                  <Input
                    id="tutorTelefono"
                    {...register("tutorTelefono")}
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tutorEmail">Email del tutor</Label>
                  <Input
                    id="tutorEmail"
                    type="email"
                    {...register("tutorEmail")}
                    placeholder="tutor@ejemplo.com"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Guardar Cambios" : "Crear Alumno"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
