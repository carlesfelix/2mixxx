import { IHttp } from '@/core/core-http'
import { ReactNode } from 'react'

export type QueryProviderProps = {
  children: ReactNode;
  http: IHttp;
};
