"use client"

import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Error",
  message = "Ha ocurrido un error inesperado",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Reintentar
        </Button>
      )}
    </div>
  )
}

interface ErrorPageProps {
  title?: string
  message?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  onRetry?: () => void
}

export function ErrorPage({
  title = "Algo salio mal",
  message = "Ha ocurrido un error al cargar esta pagina. Por favor, intenta de nuevo.",
  showHomeButton = true,
  showBackButton = true,
  onRetry,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-3">
        {showBackButton && (
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        )}
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        )}
        {showHomeButton && (
          <Button asChild>
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

interface ErrorCardProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorCard({
  title = "Error al cargar",
  message = "No se pudo cargar el contenido",
  onRetry,
}: ErrorCardProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-destructive/80">{message}</CardDescription>
      </CardHeader>
      {onRetry && (
        <CardContent>
          <Button size="sm" variant="outline" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Reintentar
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

interface NotFoundProps {
  title?: string
  message?: string
  resource?: string
}

export function NotFound({
  title,
  message,
  resource = "recurso",
}: NotFoundProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <AlertCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-medium">
          {title || `${resource.charAt(0).toUpperCase() + resource.slice(1)} no encontrado`}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {message || `El ${resource} que buscas no existe o ha sido eliminado.`}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <Button asChild>
          <Link href="/dashboard">
            <Home className="h-4 w-4 mr-2" />
            Inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon = AlertCircle, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 text-center p-8">
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{message}</p>
      </div>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
