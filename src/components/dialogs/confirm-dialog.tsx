"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Trash2, Loader2 } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  icon?: ReactNode
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "default",
  icon,
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm()
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const DefaultIcon = variant === "destructive" ? Trash2 : AlertTriangle

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-2 ${
                variant === "destructive"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {icon || <DefaultIcon className="h-5 w-5" />}
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Convenience wrappers
interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
}

export function DeleteDialog({
  open,
  onOpenChange,
  itemName,
  isLoading,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Eliminar elemento"
      description={`¿Estas seguro de que quieres eliminar "${itemName}"? Esta accion no se puede deshacer.`}
      confirmLabel="Eliminar"
      variant="destructive"
      isLoading={isLoading}
      onConfirm={onConfirm}
    />
  )
}
