"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  FileText,
  Wallet,
  UserCog,
  HeadphonesIcon,
  Settings,
  BarChart3,
  Target,
  BookOpen,
  Calendar,
  ClipboardList,
  MessageSquare,
  Languages,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Comercial",
    href: "/comercial",
    icon: Target,
    children: [
      { title: "Leads", href: "/comercial/leads", icon: Users },
      { title: "Pipeline", href: "/comercial/pipeline", icon: BarChart3 },
      { title: "Propuestas", href: "/comercial/propuestas", icon: FileText },
      { title: "Convenios", href: "/comercial/convenios", icon: Building2 },
      { title: "Campanas", href: "/comercial/campanas", icon: Target },
    ],
  },
  {
    title: "Academico",
    href: "/academico",
    icon: GraduationCap,
    children: [
      { title: "Alumnos", href: "/academico/alumnos", icon: Users },
      { title: "Profesores", href: "/academico/profesores", icon: UserCog },
      { title: "Cursos", href: "/academico/cursos", icon: BookOpen },
      { title: "Grupos", href: "/academico/grupos", icon: BookOpen },
      { title: "Horarios", href: "/academico/horarios", icon: Calendar },
      { title: "Tests Nivel", href: "/academico/tests", icon: ClipboardList },
      { title: "Evaluaciones", href: "/academico/evaluaciones", icon: FileText },
    ],
  },
  {
    title: "Operaciones",
    href: "/operaciones",
    icon: Building2,
    children: [
      { title: "Sedes", href: "/operaciones/sedes", icon: Building2 },
      { title: "Aulas", href: "/operaciones/aulas", icon: BookOpen },
      { title: "Asistencia", href: "/operaciones/asistencia", icon: ClipboardList },
      { title: "Inventario", href: "/operaciones/inventario", icon: Settings },
    ],
  },
  {
    title: "Finanzas",
    href: "/finanzas",
    icon: Wallet,
    children: [
      { title: "Matriculas", href: "/finanzas/matriculas", icon: FileText },
      { title: "Facturacion", href: "/finanzas/facturacion", icon: FileText },
      { title: "Cobros", href: "/finanzas/cobros", icon: Wallet },
      { title: "Fundae", href: "/finanzas/fundae", icon: Building2 },
      { title: "Informes", href: "/finanzas/informes", icon: BarChart3 },
    ],
  },
  {
    title: "RRHH",
    href: "/rrhh",
    icon: UserCog,
    children: [
      { title: "Empleados", href: "/rrhh/empleados", icon: Users },
      { title: "Nominas", href: "/rrhh/nominas", icon: FileText },
      { title: "Ausencias", href: "/rrhh/ausencias", icon: Calendar },
      { title: "Desempeno", href: "/rrhh/desempeno", icon: BarChart3 },
    ],
  },
  {
    title: "Atencion",
    href: "/atencion",
    icon: HeadphonesIcon,
    children: [
      { title: "Tickets", href: "/atencion/tickets", icon: MessageSquare },
      { title: "Citas", href: "/atencion/citas", icon: Calendar },
    ],
  },
  {
    title: "Comunicacion",
    href: "/comunicacion",
    icon: MessageSquare,
  },
  {
    title: "Calidad",
    href: "/calidad",
    icon: ClipboardList,
    children: [
      { title: "Encuestas", href: "/calidad/encuestas", icon: ClipboardList },
      { title: "Reportes", href: "/calidad/reportes", icon: FileText },
    ],
  },
  {
    title: "Direccion",
    href: "/direccion",
    icon: BarChart3,
    children: [
      { title: "KPIs", href: "/direccion/kpis", icon: BarChart3 },
      { title: "Informes", href: "/direccion/informes", icon: FileText },
    ],
  },
]

interface NavItemProps {
  item: NavItem
  isActive: boolean
  isChildActive: boolean
}

function NavItemComponent({ item, isActive, isChildActive }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(isActive || isChildActive)
  const hasChildren = item.children && item.children.length > 0
  const pathname = usePathname()

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive || isChildActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            {item.title}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l pl-3">
            {item.children?.map((child) => {
              const childActive = pathname === child.href
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    childActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <child.icon className="h-4 w-4" />
                  {child.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Languages className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold">LCidiomas</h1>
          <p className="text-xs text-muted-foreground">Sistema Integral</p>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const isChildActive = item.children?.some(
              (child) => pathname === child.href || pathname.startsWith(child.href + "/")
            )
            return (
              <NavItemComponent
                key={item.href}
                item={item}
                isActive={isActive}
                isChildActive={isChildActive || false}
              />
            )
          })}
        </nav>
      </ScrollArea>
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/configuracion">
            <Settings className="h-4 w-4" />
            Configuracion
          </Link>
        </Button>
      </div>
    </div>
  )
}
