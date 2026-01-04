import { Metadata } from "next"
import { DashboardClient } from "./dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard",
}

// Mock data for dashboard
const kpiData = {
  alumnos: { total: 342, activos: 298, nuevos: 24, tendencia: 8.2 },
  leads: { total: 156, nuevos: 42, conversion: 32.5, tendencia: 12.4 },
  facturacion: { total: 89450, mes: 28340, pendiente: 12680, tendencia: 5.8 },
  clases: { hoy: 24, semana: 156, asistencia: 94.2, tendencia: 2.1 },
}

const leadsData = [
  { mes: "Ago", leads: 98, conversiones: 28 },
  { mes: "Sep", leads: 112, conversiones: 35 },
  { mes: "Oct", leads: 134, conversiones: 42 },
  { mes: "Nov", leads: 128, conversiones: 38 },
  { mes: "Dic", leads: 142, conversiones: 48 },
  { mes: "Ene", leads: 156, conversiones: 52 },
]

const facturacionData = [
  { mes: "Ago", facturado: 24500, cobrado: 22800 },
  { mes: "Sep", facturado: 28900, cobrado: 26500 },
  { mes: "Oct", facturado: 31200, cobrado: 29800 },
  { mes: "Nov", facturado: 27800, cobrado: 25400 },
  { mes: "Dic", facturado: 35600, cobrado: 32100 },
  { mes: "Ene", facturado: 28340, cobrado: 24800 },
]

const alumnosPorNivel = [
  { nivel: "A1", cantidad: 45, color: "#22c55e" },
  { nivel: "A2", cantidad: 68, color: "#3b82f6" },
  { nivel: "B1", cantidad: 89, color: "#8b5cf6" },
  { nivel: "B2", cantidad: 56, color: "#f59e0b" },
  { nivel: "C1", cantidad: 32, color: "#ef4444" },
  { nivel: "C2", cantidad: 8, color: "#06b6d4" },
]

const clasesHoy = [
  { hora: "09:00", grupo: "B1-MJ-001", profesor: "Maria Garcia", aula: "A1", alumnos: 8 },
  { hora: "10:30", grupo: "A2-LMV-002", profesor: "Carlos Lopez", aula: "A2", alumnos: 10 },
  { hora: "11:00", grupo: "Business English", profesor: "Maria Garcia", aula: "AM1", alumnos: 6 },
  { hora: "16:00", grupo: "ALE-A1-001", profesor: "Anna Mueller", aula: "A3", alumnos: 5 },
  { hora: "18:00", grupo: "B1-MJ-001", profesor: "Maria Garcia", aula: "A1", alumnos: 8 },
  { hora: "19:00", grupo: "FRA-A1-001", profesor: "Laura Fernandez", aula: "A2", alumnos: 7 },
  { hora: "19:30", grupo: "B2-MJ-004", profesor: "John Smith", aula: "A1", alumnos: 9 },
  { hora: "20:00", grupo: "C1-SS-003", profesor: "Maria Garcia", aula: "AM1", alumnos: 6 },
]

const actividadReciente = [
  { tipo: "lead", mensaje: "Nuevo lead: Roberto Gonzalez (Web)", tiempo: "Hace 5 min" },
  { tipo: "matricula", mensaje: "Matricula completada: Ana Lopez", tiempo: "Hace 15 min" },
  { tipo: "pago", mensaje: "Pago recibido: 890€ - Carlos Rodriguez", tiempo: "Hace 32 min" },
  { tipo: "ticket", mensaje: "Ticket resuelto: TK-2026-0005", tiempo: "Hace 1 hora" },
  { tipo: "lead", mensaje: "Lead convertido: Carmen Blazquez", tiempo: "Hace 2 horas" },
  { tipo: "clase", mensaje: "Clase completada: B1-MJ-001", tiempo: "Hace 3 horas" },
]

const tareasPendientes = [
  { titulo: "Llamar a Fernando Reyes", prioridad: "alta", vence: "Hoy" },
  { titulo: "Enviar propuesta Tech Solutions", prioridad: "alta", vence: "Hoy" },
  { titulo: "Revisar evaluaciones Q4", prioridad: "media", vence: "Manana" },
  { titulo: "Preparar informe mensual", prioridad: "media", vence: "3 dias" },
  { titulo: "Reunion coordinacion", prioridad: "baja", vence: "Viernes" },
]

export default function DashboardPage() {
  return (
    <DashboardClient
      kpiData={kpiData}
      leadsData={leadsData}
      facturacionData={facturacionData}
      alumnosPorNivel={alumnosPorNivel}
      clasesHoy={clasesHoy}
      actividadReciente={actividadReciente}
      tareasPendientes={tareasPendientes}
    />
  )
}
