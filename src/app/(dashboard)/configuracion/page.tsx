import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Building,
  Users,
  Bell,
  Lock,
  Palette,
  Globe,
  Database,
  Mail,
  CreditCard,
  Bot,
  Save,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Configuracion",
}

const configSections = [
  {
    id: "empresa",
    titulo: "Datos de la Empresa",
    descripcion: "Informacion general de LCidiomas",
    icon: Building,
    campos: [
      { label: "Nombre", value: "LCidiomas", type: "text" },
      { label: "CIF", value: "B12345678", type: "text" },
      { label: "Direccion", value: "Calle Mayor 15, Madrid", type: "text" },
      { label: "Telefono", value: "+34 91 123 4567", type: "text" },
      { label: "Email", value: "info@lcidiomas.com", type: "email" },
      { label: "Web", value: "www.lcidiomas.com", type: "url" },
    ],
  },
  {
    id: "sedes",
    titulo: "Sedes",
    descripcion: "Gestion de centros y aulas",
    icon: Globe,
    items: [
      { nombre: "LCidiomas Centro", estado: "Activa", aulas: 5 },
      { nombre: "LCidiomas Norte", estado: "Activa", aulas: 3 },
      { nombre: "LCidiomas Sur", estado: "Activa", aulas: 2 },
    ],
  },
]

const integraciones = [
  { nombre: "Pasarela de Pago (Stripe)", estado: "Conectado", icon: CreditCard },
  { nombre: "Email Marketing (Mailchimp)", estado: "Conectado", icon: Mail },
  { nombre: "Base de Datos (PostgreSQL)", estado: "Conectado", icon: Database },
  { nombre: "Agentes IA (Claude)", estado: "Configurado", icon: Bot },
]

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuracion</h1>
          <p className="text-muted-foreground">
            Ajustes generales del sistema
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar de navegacion */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Secciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1 p-2">
                {[
                  { icon: Building, label: "Empresa", active: true },
                  { icon: Globe, label: "Sedes" },
                  { icon: Users, label: "Roles y Permisos" },
                  { icon: Bell, label: "Notificaciones" },
                  { icon: Lock, label: "Seguridad" },
                  { icon: Palette, label: "Apariencia" },
                  { icon: Mail, label: "Email" },
                  { icon: CreditCard, label: "Facturacion" },
                  { icon: Bot, label: "Agentes IA" },
                  { icon: Database, label: "Base de Datos" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos de la Empresa */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Datos de la Empresa</CardTitle>
                  <CardDescription>Informacion general de LCidiomas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" defaultValue="LCidiomas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cif">CIF</Label>
                  <Input id="cif" defaultValue="B12345678" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">Direccion</Label>
                  <Input id="direccion" defaultValue="Calle Mayor 15, 28013 Madrid" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Telefono</Label>
                  <Input id="telefono" defaultValue="+34 91 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@lcidiomas.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="web">Sitio Web</Label>
                  <Input id="web" defaultValue="https://www.lcidiomas.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sedes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Sedes</CardTitle>
                    <CardDescription>Centros y ubicaciones</CardDescription>
                  </div>
                </div>
                <Button size="sm">Anadir Sede</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {configSections[1].items?.map((sede, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{sede.nombre}</p>
                      <p className="text-sm text-muted-foreground">{sede.aulas} aulas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">{sede.estado}</Badge>
                      <Button size="sm" variant="outline">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integraciones */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Integraciones</CardTitle>
                  <CardDescription>Servicios externos conectados</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integraciones.map((integracion, idx) => {
                  const Icon = integracion.icon
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <p className="font-medium">{integracion.nombre}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">{integracion.estado}</Badge>
                        <Button size="sm" variant="outline">Configurar</Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
