import { type HttpRequestOptions } from '@/core/core-http'
import { type ReactElement } from 'react'
import { SWRConfig } from 'swr'
import { type QueryProviderProps } from './types'

export default function QueryProvider (
  props: QueryProviderProps
): ReactElement {
  const { children, http } = props
  return (
    <SWRConfig value={{
      fetcher: async (
        url: string,
        data?: unknown,
        options?: HttpRequestOptions
      ) => {
        if (data === undefined) {
          const getRes = await http.get(url, options)
          return getRes.data
        }
        const postRes = await http.post(url, data, options)
        return postRes.data
      }
    }}>
      {children}
    </SWRConfig>
  )
}
