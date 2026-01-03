import { Metadata } from "next"
import { MicroSlackClient } from "./client"

export const metadata: Metadata = {
  title: "MicroSlack",
}

// Mock data
const channels = [
  { id: "1", nombre: "general", descripcion: "Canal general de la academia", tipo: "GENERAL", unread: 0, miembros: 25 },
  { id: "2", nombre: "anuncios", descripcion: "Anuncios oficiales", tipo: "ANUNCIOS", unread: 2, miembros: 25 },
  { id: "3", nombre: "academico", descripcion: "Equipo academico", tipo: "DEPARTAMENTO", unread: 5, miembros: 8 },
  { id: "4", nombre: "comercial", descripcion: "Equipo comercial", tipo: "DEPARTAMENTO", unread: 0, miembros: 4 },
  { id: "5", nombre: "sede-centro", descripcion: "Equipo Sede Centro", tipo: "SEDE", unread: 3, miembros: 12 },
  { id: "6", nombre: "proyecto-verano", descripcion: "Campamentos de verano 2026", tipo: "PROYECTO", unread: 0, miembros: 6 },
]

const directMessages = [
  { id: "dm1", nombre: "Ana Garcia", online: true, unread: 1 },
  { id: "dm2", nombre: "Pedro Sanchez", online: true, unread: 0 },
  { id: "dm3", nombre: "Maria Garcia", online: false, unread: 0 },
  { id: "dm4", nombre: "Carlos Martinez", online: true, unread: 0 },
]

const messages = [
  {
    id: "m1",
    usuario: "Ana Garcia",
    avatar: "AG",
    contenido: "Buenos dias a todos! Recordad que hoy tenemos reunion de coordinacion a las 13:00.",
    hora: "09:15",
    reacciones: [{ emoji: "👍", count: 5 }, { emoji: "✅", count: 3 }],
  },
  {
    id: "m2",
    usuario: "Carlos Martinez",
    avatar: "CM",
    contenido: "Perfecto, alli estaremos. Por cierto, los resultados del trimestre anterior han sido muy positivos. Gracias a todos por el esfuerzo!",
    hora: "09:22",
    reacciones: [{ emoji: "🎉", count: 8 }],
  },
  {
    id: "m3",
    usuario: "Pedro Sanchez",
    avatar: "PS",
    contenido: "Tenemos 3 nuevas matriculas confirmadas para esta semana. Dos son referidos de alumnos actuales.",
    hora: "09:45",
    reacciones: [{ emoji: "🚀", count: 4 }, { emoji: "👏", count: 6 }],
  },
  {
    id: "m4",
    usuario: "Maria Garcia",
    avatar: "MG",
    contenido: "El grupo B1 de martes/jueves esta casi completo. Solo quedan 2 plazas.",
    hora: "10:02",
    reacciones: [],
  },
  {
    id: "m5",
    usuario: "Ana Garcia",
    avatar: "AG",
    contenido: "Excelente! @Pedro podrias preparar una propuesta para el lead de Tech Solutions? Parece muy interesado en formacion para su equipo.",
    hora: "10:15",
    reacciones: [{ emoji: "✅", count: 1 }],
  },
  {
    id: "m6",
    usuario: "Pedro Sanchez",
    avatar: "PS",
    contenido: "Si, ya la tengo casi lista. La envio esta tarde despues de la reunion.",
    hora: "10:18",
    reacciones: [{ emoji: "👍", count: 2 }],
  },
]

export default function ComunicacionPage() {
  return (
    <MicroSlackClient
      channels={channels}
      directMessages={directMessages}
      messages={messages}
    />
  )
}
