import { type ReactNode } from 'react'
import { type IFormConfigBuilder } from '../../services/FormConfigBuilder'

export interface FormConfigProviderProps {
  children: ReactNode
  configBuilder: IFormConfigBuilder
}

export interface FormConfigContextValue {
  configBuilder: IFormConfigBuilder
}
