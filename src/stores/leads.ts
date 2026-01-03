import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface Lead {
  id: string
  nombre: string
  apellidos: string
  email: string
  telefono?: string
  empresa?: string
  segmento: string
  origen: string
  estado: string
  temperatura: string
  score: number
  comercialId?: string
  comercial?: {
    user: {
      firstName: string
      lastName: string
    }
  }
  idiomaInteres?: string
  horarioPreferido?: string
  proximoContacto?: string
  createdAt: string
}

interface LeadsState {
  leads: Lead[]
  selectedLead: Lead | null
  isLoading: boolean
  error: string | null
  filters: {
    estado: string | null
    segmento: string | null
    comercialId: string | null
    search: string
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  // Actions
  setLeads: (leads: Lead[]) => void
  addLead: (lead: Lead) => void
  updateLead: (id: string, data: Partial<Lead>) => void
  deleteLead: (id: string) => void
  selectLead: (lead: Lead | null) => void
  setFilters: (filters: Partial<LeadsState["filters"]>) => void
  setPagination: (pagination: Partial<LeadsState["pagination"]>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Async actions
  fetchLeads: () => Promise<void>
  createLead: (data: Omit<Lead, "id" | "createdAt">) => Promise<Lead>
}

export const useLeadsStore = create<LeadsState>()(
  devtools(
    persist(
      (set, get) => ({
        leads: [],
        selectedLead: null,
        isLoading: false,
        error: null,
        filters: {
          estado: null,
          segmento: null,
          comercialId: null,
          search: "",
        },
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },

        setLeads: (leads) => set({ leads }),

        addLead: (lead) =>
          set((state) => ({ leads: [lead, ...state.leads] })),

        updateLead: (id, data) =>
          set((state) => ({
            leads: state.leads.map((lead) =>
              lead.id === id ? { ...lead, ...data } : lead
            ),
            selectedLead:
              state.selectedLead?.id === id
                ? { ...state.selectedLead, ...data }
                : state.selectedLead,
          })),

        deleteLead: (id) =>
          set((state) => ({
            leads: state.leads.filter((lead) => lead.id !== id),
            selectedLead:
              state.selectedLead?.id === id ? null : state.selectedLead,
          })),

        selectLead: (lead) => set({ selectedLead: lead }),

        setFilters: (filters) =>
          set((state) => ({
            filters: { ...state.filters, ...filters },
            pagination: { ...state.pagination, page: 1 },
          })),

        setPagination: (pagination) =>
          set((state) => ({
            pagination: { ...state.pagination, ...pagination },
          })),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        fetchLeads: async () => {
          const { filters, pagination } = get()
          set({ isLoading: true, error: null })

          try {
            const params = new URLSearchParams()
            params.set("page", String(pagination.page))
            params.set("limit", String(pagination.limit))
            if (filters.estado) params.set("estado", filters.estado)
            if (filters.segmento) params.set("segmento", filters.segmento)
            if (filters.comercialId) params.set("comercialId", filters.comercialId)

            const response = await fetch(`/api/leads?${params}`)
            if (!response.ok) throw new Error("Error fetching leads")

            const data = await response.json()
            set({
              leads: data.data,
              pagination: data.pagination,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Error desconocido",
              isLoading: false,
            })
          }
        },

        createLead: async (data) => {
          set({ isLoading: true, error: null })

          try {
            const response = await fetch("/api/leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            })

            if (!response.ok) {
              const error = await response.json()
              throw new Error(error.error || "Error creating lead")
            }

            const lead = await response.json()
            set((state) => ({
              leads: [lead, ...state.leads],
              isLoading: false,
            }))
            return lead
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : "Error desconocido",
              isLoading: false,
            })
            throw error
          }
        },
      }),
      {
        name: "leads-storage",
        partialize: (state) => ({ filters: state.filters }),
      }
    )
  )
)
