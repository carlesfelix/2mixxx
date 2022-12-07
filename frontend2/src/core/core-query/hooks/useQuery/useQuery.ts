import useSWR from 'swr'
import { UseQueryOptions, UseQueryReturn } from './types'

export default function useQuery<Data> (
  key: string,
  options: UseQueryOptions<Data> = {}
): UseQueryReturn<Data> {
  const { defaultData, httpData, ...fetcherDeps } = options
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isValidating, mutate } = useSWR([
    key, httpData, fetcherDeps
  ])
  return {
    state: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: data || defaultData,
      inProgress: !error && !data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error,
      isValidating
    },
    mutate
  }
}
