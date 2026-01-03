"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Hash,
  Plus,
  Send,
  Search,
  Settings,
  Bell,
  Users,
  MessageSquare,
  Smile,
  Paperclip,
  MoreVertical,
  Circle,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Channel {
  id: string
  nombre: string
  descripcion: string
  tipo: string
  unread: number
  miembros: number
}

interface DirectMessage {
  id: string
  nombre: string
  online: boolean
  unread: number
}

interface Message {
  id: string
  usuario: string
  avatar: string
  contenido: string
  hora: string
  reacciones: { emoji: string; count: number }[]
}

interface MicroSlackClientProps {
  channels: Channel[]
  directMessages: DirectMessage[]
  messages: Message[]
}

export function MicroSlackClient({ channels, directMessages, messages }: MicroSlackClientProps) {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [messageInput, setMessageInput] = useState("")
  const [showChannels, setShowChannels] = useState(true)
  const [showDMs, setShowDMs] = useState(true)

  const totalUnread = channels.reduce((acc, c) => acc + c.unread, 0) +
    directMessages.reduce((acc, dm) => acc + dm.unread, 0)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 -m-6">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Workspace Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">LCidiomas</h2>
              <p className="text-xs text-slate-400">MicroSlack</p>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar..."
              className="pl-9 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-slate-600"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Channels */}
          <div className="px-2">
            <button
              onClick={() => setShowChannels(!showChannels)}
              className="flex items-center gap-1 px-2 py-1 text-sm text-slate-400 hover:text-white w-full"
            >
              <ChevronDown className={`h-3 w-3 transition-transform ${showChannels ? "" : "-rotate-90"}`} />
              Canales
            </button>
            {showChannels && (
              <div className="space-y-0.5 mt-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex items-center justify-between w-full px-2 py-1.5 rounded text-sm ${
                      selectedChannel.id === channel.id
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      {channel.nombre}
                    </span>
                    {channel.unread > 0 && (
                      <Badge className="bg-red-500 text-white text-xs h-5 min-w-[20px]">
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
                <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-slate-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                  Anadir canal
                </button>
              </div>
            )}
          </div>

          <Separator className="my-3 bg-slate-700" />

          {/* Direct Messages */}
          <div className="px-2">
            <button
              onClick={() => setShowDMs(!showDMs)}
              className="flex items-center gap-1 px-2 py-1 text-sm text-slate-400 hover:text-white w-full"
            >
              <ChevronDown className={`h-3 w-3 transition-transform ${showDMs ? "" : "-rotate-90"}`} />
              Mensajes Directos
            </button>
            {showDMs && (
              <div className="space-y-0.5 mt-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    className="flex items-center justify-between w-full px-2 py-1.5 rounded text-sm text-slate-300 hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-slate-600">
                            {dm.nombre.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <Circle
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 ${
                            dm.online ? "text-green-500 fill-green-500" : "text-slate-500 fill-slate-500"
                          }`}
                        />
                      </div>
                      {dm.nombre}
                    </span>
                    {dm.unread > 0 && (
                      <Badge className="bg-red-500 text-white text-xs h-5 min-w-[20px]">
                        {dm.unread}
                      </Badge>
                    )}
                  </button>
                ))}
                <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-slate-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                  Nuevo mensaje
                </button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Channel Header */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">{selectedChannel.nombre}</span>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">{selectedChannel.descripcion}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              {selectedChannel.miembros}
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* Date Separator */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">Hoy, 3 de Enero</span>
              <Separator className="flex-1" />
            </div>

            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">{message.usuario}</span>
                    <span className="text-xs text-muted-foreground">{message.hora}</span>
                  </div>
                  <p className="text-sm mt-0.5">{message.contenido}</p>
                  {message.reacciones.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reacciones.map((r, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs"
                        >
                          <span>{r.emoji}</span>
                          <span>{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex items-start gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-5 w-5" />
            </Button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Mensaje en #${selectedChannel.nombre}`}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-8 w-8" disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Channel Info */}
      <div className="w-64 border-l bg-slate-50 p-4 hidden xl:block">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Hash className="h-4 w-4" />
              {selectedChannel.nombre}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{selectedChannel.descripcion}</p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Miembros ({selectedChannel.miembros})</h4>
            <div className="space-y-2">
              {directMessages.slice(0, 4).map((dm) => (
                <div key={dm.id} className="flex items-center gap-2 text-sm">
                  <div className="relative">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {dm.nombre.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Circle
                      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 ${
                        dm.online ? "text-green-500 fill-green-500" : "text-slate-400 fill-slate-400"
                      }`}
                    />
                  </div>
                  <span>{dm.nombre}</span>
                </div>
              ))}
              <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                Ver todos los miembros
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Ajustes del canal</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Volume2 className="h-4 w-4" />
                Silenciar canal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
