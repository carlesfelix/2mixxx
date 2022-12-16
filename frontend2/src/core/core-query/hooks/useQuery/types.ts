import { HttpRequestOptions } from '@/core/core-http'

export type UseQueryOptions<Data> = HttpRequestOptions & {
  defaultData?: Data
  httpData?: unknown
}

export interface UseQueryState<Data> {
  inProgress: boolean
  error?: unknown
  data: Data
  isValidating: boolean
}

export type MutatorCallback<Data = unknown> = (currentData?: Data) => Promise<undefined | Data> | undefined | Data

export interface MutatorOptions<Data = unknown> {
  revalidate?: boolean
  populateCache?: boolean | ((result: unknown, currentData: Data) => Data)
  optimisticData?: Data | ((currentData?: Data) => Data)
  rollbackOnError?: boolean
}

export type UseDataMutator<Data> = (data?: Data | Promise<Data> | MutatorCallback<Data>, opts?: boolean | MutatorOptions<Data>) => Promise<Data | undefined>

export interface UseQueryReturn<Data = unknown> {
  mutate: UseDataMutator<Data>
  state: UseQueryState<Data>
}
