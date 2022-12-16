import { IHttp } from '@/core/core-http'
import { ReactNode } from 'react'

export interface QueryProviderProps {
  children: ReactNode
  http: IHttp
}
