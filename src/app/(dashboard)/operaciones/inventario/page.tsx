import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BookOpen,
  Monitor,
  Printer,
  Trash2,
  Building,
  Search,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Inventario",
}

// Mock data
const inventario = [
  {
    id: "1",
    codigo: "MAT-001",
    nombre: "English File Upper-Intermediate",
    categoria: "MATERIAL_DIDACTICO",
    sede: "Centro",
    cantidad: 45,
    minimo: 20,
    ubicacion: "Almacen A, Estante 1",
    ultimoMovimiento: { tipo: "ENTRADA", cantidad: 30, fecha: "2025-12-15" },
  },
  {
    id: "2",
    codigo: "MAT-002",
    nombre: "Workbook B1",
    categoria: "MATERIAL_DIDACTICO",
    sede: "Centro",
    cantidad: 12,
    minimo: 15,
    ubicacion: "Almacen A, Estante 2",
    ultimoMovimiento: { tipo: "SALIDA", cantidad: 8, fecha: "2026-01-02" },
  },
  {
    id: "3",
    codigo: "MAT-003",
    nombre: "Libro Cambridge C1",
    categoria: "MATERIAL_DIDACTICO",
    sede: "Centro",
    cantidad: 8,
    minimo: 10,
    ubicacion: "Almacen A, Estante 3",
    ultimoMovimiento: { tipo: "SALIDA", cantidad: 5, fecha: "2025-12-28" },
  },
  {
    id: "4",
    codigo: "ELE-001",
    nombre: "Proyector Epson EB-X51",
    categoria: "ELECTRONICA",
    sede: "Centro",
    cantidad: 5,
    minimo: 2,
    ubicacion: "Almacen Tecnico",
    ultimoMovimiento: { tipo: "ENTRADA", cantidad: 2, fecha: "2025-11-20" },
  },
  {
    id: "5",
    codigo: "ELE-002",
    nombre: "Altavoces Bluetooth",
    categoria: "ELECTRONICA",
    sede: "Centro",
    cantidad: 8,
    minimo: 3,
    ubicacion: "Almacen Tecnico",
    ultimoMovimiento: { tipo: "ENTRADA", cantidad: 4, fecha: "2025-10-15" },
  },
  {
    id: "6",
    codigo: "OFI-001",
    nombre: "Pack Folios A4 (500 uds)",
    categoria: "OFICINA",
    sede: "Centro",
    cantidad: 25,
    minimo: 10,
    ubicacion: "Almacen General",
    ultimoMovimiento: { tipo: "ENTRADA", cantidad: 50, fecha: "2025-12-01" },
  },
  {
    id: "7",
    codigo: "OFI-002",
    nombre: "Boligrafos Bic (caja 50)",
    categoria: "OFICINA",
    sede: "Centro",
    cantidad: 4,
    minimo: 5,
    ubicacion: "Almacen General",
    ultimoMovimiento: { tipo: "SALIDA", cantidad: 2, fecha: "2026-01-02" },
  },
  {
    id: "8",
    codigo: "MOB-001",
    nombre: "Silla Oficina Ergonomica",
    categoria: "MOBILIARIO",
    sede: "Centro",
    cantidad: 30,
    minimo: 5,
    ubicacion: "En uso",
    ultimoMovimiento: { tipo: "ENTRADA", cantidad: 10, fecha: "2025-09-01" },
  },
  {
    id: "9",
    codigo: "LIM-001",
    nombre: "Producto Limpieza Multiusos",
    categoria: "LIMPIEZA",
    sede: "Centro",
    cantidad: 3,
    minimo: 5,
    ubicacion: "Almacen Limpieza",
    ultimoMovimiento: { tipo: "SALIDA", cantidad: 2, fecha: "2025-12-30" },
  },
]

const categoriaConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  MATERIAL_DIDACTICO: { color: "bg-blue-100 text-blue-800", icon: BookOpen, label: "Material Didactico" },
  MOBILIARIO: { color: "bg-yellow-100 text-yellow-800", icon: Building, label: "Mobiliario" },
  ELECTRONICA: { color: "bg-purple-100 text-purple-800", icon: Monitor, label: "Electronica" },
  OFICINA: { color: "bg-green-100 text-green-800", icon: Printer, label: "Oficina" },
  LIMPIEZA: { color: "bg-cyan-100 text-cyan-800", icon: Trash2, label: "Limpieza" },
  OTRO: { color: "bg-gray-100 text-gray-800", icon: Package, label: "Otro" },
}

function getStockStatus(cantidad: number, minimo: number) {
  const ratio = cantidad / minimo
  if (ratio <= 0.5) return { status: "critical", color: "text-red-600 bg-red-50", label: "Critico" }
  if (ratio <= 1) return { status: "low", color: "text-orange-600 bg-orange-50", label: "Bajo" }
  return { status: "ok", color: "text-green-600 bg-green-50", label: "OK" }
}

export default function InventarioPage() {
  // Stats
  const totalItems = inventario.length
  const itemsBajoStock = inventario.filter(i => i.cantidad < i.minimo).length
  const itemsCriticos = inventario.filter(i => i.cantidad <= i.minimo * 0.5).length
  const valorEstimado = inventario.reduce((acc, i) => acc + i.cantidad * 10, 0) // Valor estimado simplificado

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventario</h1>
          <p className="text-muted-foreground">
            Control de materiales y equipamiento
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            Entrada
          </Button>
          <Button variant="outline">
            <TrendingDown className="mr-2 h-4 w-4" />
            Salida
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{itemsBajoStock}</div>
                <p className="text-sm text-muted-foreground">Stock Bajo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{itemsCriticos}</div>
                <p className="text-sm text-muted-foreground">Criticos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{valorEstimado.toLocaleString("es-ES")}€</div>
                <p className="text-sm text-muted-foreground">Valor Estimado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {itemsBajoStock > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Alertas de Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {inventario
                .filter(i => i.cantidad < i.minimo)
                .map(item => {
                  const status = getStockStatus(item.cantidad, item.minimo)
                  return (
                    <div key={item.id} className="flex items-center justify-between rounded-lg bg-white p-3 border">
                      <div>
                        <p className="font-medium text-sm">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground">{item.codigo}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={status.color}>{item.cantidad}/{item.minimo}</Badge>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre o codigo..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Inventario</CardTitle>
          <CardDescription>{inventario.length} items registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left text-sm font-medium">Codigo</th>
                  <th className="p-3 text-left text-sm font-medium">Nombre</th>
                  <th className="p-3 text-left text-sm font-medium">Categoria</th>
                  <th className="p-3 text-left text-sm font-medium">Ubicacion</th>
                  <th className="p-3 text-center text-sm font-medium">Stock</th>
                  <th className="p-3 text-center text-sm font-medium">Estado</th>
                  <th className="p-3 text-left text-sm font-medium">Ultimo Mov.</th>
                </tr>
              </thead>
              <tbody>
                {inventario.map((item) => {
                  const CatIcon = categoriaConfig[item.categoria]?.icon || Package
                  const status = getStockStatus(item.cantidad, item.minimo)
                  return (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <span className="font-mono text-sm">{item.codigo}</span>
                      </td>
                      <td className="p-3">
                        <p className="font-medium text-sm">{item.nombre}</p>
                      </td>
                      <td className="p-3">
                        <Badge className={categoriaConfig[item.categoria]?.color}>
                          <CatIcon className="h-3 w-3 mr-1" />
                          {categoriaConfig[item.categoria]?.label}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{item.ubicacion}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-medium">{item.cantidad}</span>
                        <span className="text-muted-foreground text-xs">/{item.minimo}</span>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={status.color}>{status.label}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm">
                          {item.ultimoMovimiento.tipo === "ENTRADA" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span>{item.ultimoMovimiento.cantidad}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
