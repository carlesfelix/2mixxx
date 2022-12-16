import useSWR from 'swr'
import { UseQueryOptions, UseQueryReturn } from './types'

export default function useQuery<Data> (
  key: string,
  options: UseQueryOptions<Data> = {}
): UseQueryReturn<Data> {
  const { defaultData, httpData, ...fetcherDeps } = options
  const { data, error, isValidating, mutate } = useSWR([
    key, httpData, fetcherDeps
  ])
  return {
    state: {
      data: data || defaultData,
      inProgress: !error && !data,
      error,
      isValidating
    },
    mutate
  }
}
