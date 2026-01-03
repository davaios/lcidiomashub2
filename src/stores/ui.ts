import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

interface Modal {
  id: string
  component: string
  props?: Record<string, unknown>
}

interface UIState {
  // Sidebar
  sidebarOpen: boolean
  sidebarCollapsed: boolean

  // Theme
  theme: "light" | "dark" | "system"

  // Notifications
  notifications: Notification[]

  // Modals
  modals: Modal[]

  // Loading states
  globalLoading: boolean
  loadingMessage: string | null

  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setTheme: (theme: "light" | "dark" | "system") => void

  // Notification actions
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void

  // Modal actions
  openModal: (modal: Omit<Modal, "id">) => void
  closeModal: (id: string) => void
  closeAllModals: () => void

  // Loading actions
  setGlobalLoading: (loading: boolean, message?: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      theme: "system",
      notifications: [],
      modals: [],
      globalLoading: false,
      loadingMessage: null,

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      setTheme: (theme) => set({ theme }),

      addNotification: (notification) => {
        const id = crypto.randomUUID()
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id }],
        }))

        // Auto-remove after duration (default 5s)
        const duration = notification.duration ?? 5000
        if (duration > 0) {
          setTimeout(() => {
            set((state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }))
          }, duration)
        }
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      openModal: (modal) => {
        const id = crypto.randomUUID()
        set((state) => ({
          modals: [...state.modals, { ...modal, id }],
        }))
      },

      closeModal: (id) =>
        set((state) => ({
          modals: state.modals.filter((m) => m.id !== id),
        })),

      closeAllModals: () => set({ modals: [] }),

      setGlobalLoading: (loading, message) =>
        set({
          globalLoading: loading,
          loadingMessage: loading ? message ?? null : null,
        }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
)
