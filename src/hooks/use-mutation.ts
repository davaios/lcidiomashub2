"use client"

import { useState, useCallback } from "react"

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: Error, variables: TVariables) => void
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void
}

interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>
  mutateAsync: (variables: TVariables) => Promise<TData>
  data: TData | undefined
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  reset: () => void
}

type MutationFunction<TData, TVariables> = (variables: TVariables) => Promise<TData>

export function useMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options: UseMutationOptions<TData, TVariables> = {}
): UseMutationResult<TData, TVariables> {
  const { onSuccess, onError, onSettled } = options

  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const reset = useCallback(() => {
    setData(undefined)
    setError(null)
    setIsLoading(false)
    setIsSuccess(false)
    setIsError(false)
  }, [])

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setIsLoading(true)
      setError(null)
      setIsSuccess(false)
      setIsError(false)

      try {
        const result = await mutationFn(variables)
        setData(result)
        setIsSuccess(true)
        onSuccess?.(result, variables)
        onSettled?.(result, null, variables)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error")
        setError(error)
        setIsError(true)
        onError?.(error, variables)
        onSettled?.(undefined, error, variables)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [mutationFn, onSuccess, onError, onSettled]
  )

  const mutate = useCallback(
    (variables: TVariables) => {
      mutateAsync(variables).catch(() => {
        // Error is already handled in mutateAsync
      })
      return mutateAsync(variables)
    },
    [mutateAsync]
  )

  return {
    mutate,
    mutateAsync,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  }
}

// Pre-built mutation functions
export function useCreateMutation<T>(url: string, options?: UseMutationOptions<T, Partial<T>>) {
  return useMutation<T, Partial<T>>(
    async (data) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error creating resource")
      }

      return response.json()
    },
    options
  )
}

export function useUpdateMutation<T>(
  getUrl: (id: string) => string,
  options?: UseMutationOptions<T, { id: string; data: Partial<T> }>
) {
  return useMutation<T, { id: string; data: Partial<T> }>(
    async ({ id, data }) => {
      const response = await fetch(getUrl(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error updating resource")
      }

      return response.json()
    },
    options
  )
}

export function useDeleteMutation(
  getUrl: (id: string) => string,
  options?: UseMutationOptions<void, string>
) {
  return useMutation<void, string>(
    async (id) => {
      const response = await fetch(getUrl(id), {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error deleting resource")
      }
    },
    options
  )
}
