import { type IHttp } from '@/core/core-http'
import { type ReactNode } from 'react'

export interface QueryProviderProps {
  children: ReactNode
  http: IHttp
}
