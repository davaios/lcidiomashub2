"use client"

import { useState, useEffect, useCallback } from "react"

interface UseFetchOptions<T> {
  initialData?: T
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseFetchResult<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  mutate: (data: T) => void
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
  const { initialData, enabled = true, onSuccess, onError } = options

  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState(enabled)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error")
      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [url, enabled, onSuccess, onError])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const mutate = useCallback((newData: T) => {
    setData(newData)
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    mutate,
  }
}

// Paginated fetch hook
interface PaginatedData<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface UsePaginatedFetchOptions {
  page?: number
  limit?: number
  enabled?: boolean
}

export function usePaginatedFetch<T>(
  baseUrl: string,
  options: UsePaginatedFetchOptions = {}
) {
  const { page = 1, limit = 20, enabled = true } = options

  const url = `${baseUrl}?page=${page}&limit=${limit}`

  const result = useFetch<PaginatedData<T>>(url, {
    enabled,
    initialData: {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    },
  })

  return {
    ...result,
    items: result.data?.data ?? [],
    pagination: result.data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 0 },
  }
}
