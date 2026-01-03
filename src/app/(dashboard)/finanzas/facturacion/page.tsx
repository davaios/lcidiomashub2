import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plus,
  FileText,
  Download,
  Send,
  Euro,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Facturacion",
}

// Mock data
const facturas = [
  {
    id: "1",
    numero: "F-2026-0001",
    serie: "A",
    cliente: "Carlos Rodriguez Martinez",
    nif: "12345678A",
    concepto: "Mensualidad Enero 2026 - Ingles B1",
    baseImponible: 120,
    tipoIVA: 21,
    importeIVA: 25.2,
    total: 145.20,
    fechaEmision: "2026-01-01",
    fechaVencimiento: "2026-01-10",
    estado: "COBRADA",
    metodoPago: "DOMICILIACION",
  },
  {
    id: "2",
    numero: "F-2026-0002",
    serie: "A",
    cliente: "Ana Lopez Fernandez",
    nif: "23456789B",
    concepto: "Trimestre 1 2026 - Ingles A2 + Frances A1",
    baseImponible: 472.50,
    tipoIVA: 21,
    importeIVA: 99.23,
    total: 571.73,
    fechaEmision: "2026-01-01",
    fechaVencimiento: "2026-01-15",
    estado: "ENVIADA",
    metodoPago: "TRANSFERENCIA",
  },
  {
    id: "3",
    numero: "F-2026-0003",
    serie: "A",
    cliente: "Miguel Garcia Perez",
    nif: "34567890C",
    concepto: "Mensualidad Enero 2026 - Aleman A1",
    baseImponible: 88.20,
    tipoIVA: 21,
    importeIVA: 18.52,
    total: 106.72,
    fechaEmision: "2026-01-01",
    fechaVencimiento: "2026-01-10",
    estado: "COBRADA",
    metodoPago: "DOMICILIACION",
  },
  {
    id: "4",
    numero: "F-2026-0004",
    serie: "B",
    cliente: "Tech Solutions SL",
    nif: "B12345678",
    concepto: "Formacion Ingles Business - Nov/Dic 2025",
    baseImponible: 3825,
    tipoIVA: 21,
    importeIVA: 803.25,
    total: 4628.25,
    fechaEmision: "2025-12-31",
    fechaVencimiento: "2026-01-15",
    estado: "VENCIDA",
    metodoPago: "TRANSFERENCIA",
  },
  {
    id: "5",
    numero: "F-2026-0005",
    serie: "A",
    cliente: "Laura Martinez Ruiz",
    nif: "45678901D",
    concepto: "Curso Completo C1 - Pago Unico",
    baseImponible: 1198.35,
    tipoIVA: 21,
    importeIVA: 251.65,
    total: 1450,
    fechaEmision: "2025-08-20",
    fechaVencimiento: "2025-08-25",
    estado: "COBRADA",
    metodoPago: "TARJETA",
  },
  {
    id: "6",
    numero: "F-2026-0006",
    serie: "A",
    cliente: "Elena Fernandez Torres",
    nif: "56789012E",
    concepto: "Mensualidad Enero 2026 - Ingles A1",
    baseImponible: 89,
    tipoIVA: 21,
    importeIVA: 18.69,
    total: 107.69,
    fechaEmision: "2026-01-01",
    fechaVencimiento: "2026-01-10",
    estado: "EMITIDA",
    metodoPago: "DOMICILIACION",
  },
  {
    id: "7",
    numero: "F-2026-0007",
    serie: "B",
    cliente: "Global Services SA",
    nif: "A98765432",
    concepto: "Formacion Ingles - Q1 2026",
    baseImponible: 4500,
    tipoIVA: 21,
    importeIVA: 945,
    total: 5445,
    fechaEmision: "2026-01-02",
    fechaVencimiento: "2026-01-17",
    estado: "ENVIADA",
    metodoPago: "TRANSFERENCIA",
  },
]

const estadoConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  BORRADOR: { color: "bg-gray-100 text-gray-800", icon: FileText, label: "Borrador" },
  EMITIDA: { color: "bg-blue-100 text-blue-800", icon: FileText, label: "Emitida" },
  ENVIADA: { color: "bg-purple-100 text-purple-800", icon: Send, label: "Enviada" },
  COBRADA: { color: "bg-green-100 text-green-800", icon: CheckCircle2, label: "Cobrada" },
  PARCIAL: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Parcial" },
  VENCIDA: { color: "bg-red-100 text-red-800", icon: AlertTriangle, label: "Vencida" },
  ANULADA: { color: "bg-gray-100 text-gray-800", icon: XCircle, label: "Anulada" },
}

export default function FacturacionPage() {
  // Stats
  const totalFacturado = facturas.reduce((acc, f) => acc + f.total, 0)
  const totalCobrado = facturas
    .filter((f) => f.estado === "COBRADA")
    .reduce((acc, f) => acc + f.total, 0)
  const totalPendiente = facturas
    .filter((f) => ["EMITIDA", "ENVIADA"].includes(f.estado))
    .reduce((acc, f) => acc + f.total, 0)
  const totalVencido = facturas
    .filter((f) => f.estado === "VENCIDA")
    .reduce((acc, f) => acc + f.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Facturacion</h1>
          <p className="text-muted-foreground">
            Gestiona todas las facturas emitidas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Factura
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Euro className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalFacturado)}</div>
                <p className="text-sm text-muted-foreground">Total Facturado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalCobrado)}</div>
                <p className="text-sm text-muted-foreground">Total Cobrado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalPendiente)}</div>
                <p className="text-sm text-muted-foreground">Pendiente Cobro</p>
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
                <div className="text-2xl font-bold">{formatCurrency(totalVencido)}</div>
                <p className="text-sm text-muted-foreground">Vencido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facturas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Facturas</CardTitle>
          <CardDescription>{facturas.length} facturas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left text-sm font-medium">Numero</th>
                  <th className="p-3 text-left text-sm font-medium">Cliente</th>
                  <th className="p-3 text-left text-sm font-medium">Concepto</th>
                  <th className="p-3 text-right text-sm font-medium">Base</th>
                  <th className="p-3 text-right text-sm font-medium">IVA</th>
                  <th className="p-3 text-right text-sm font-medium">Total</th>
                  <th className="p-3 text-left text-sm font-medium">Vencimiento</th>
                  <th className="p-3 text-left text-sm font-medium">Estado</th>
                  <th className="p-3 text-left text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura) => {
                  const EstadoIcon = estadoConfig[factura.estado]?.icon || FileText
                  return (
                    <tr key={factura.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <p className="font-medium">{factura.numero}</p>
                        <p className="text-xs text-muted-foreground">
                          Serie {factura.serie}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="font-medium">{factura.cliente}</p>
                        <p className="text-xs text-muted-foreground">{factura.nif}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm max-w-xs truncate">{factura.concepto}</p>
                      </td>
                      <td className="p-3 text-right">
                        <p className="text-sm">{formatCurrency(factura.baseImponible)}</p>
                      </td>
                      <td className="p-3 text-right">
                        <p className="text-sm">{formatCurrency(factura.importeIVA)}</p>
                        <p className="text-xs text-muted-foreground">{factura.tipoIVA}%</p>
                      </td>
                      <td className="p-3 text-right">
                        <p className="font-semibold">{formatCurrency(factura.total)}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">{formatDate(factura.fechaVencimiento)}</p>
                      </td>
                      <td className="p-3">
                        <Badge className={estadoConfig[factura.estado]?.color}>
                          <EstadoIcon className="h-3 w-3 mr-1" />
                          {estadoConfig[factura.estado]?.label}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Send className="h-4 w-4" />
                          </Button>
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
