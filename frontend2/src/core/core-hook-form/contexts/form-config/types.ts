import { ReactNode } from 'react'
import { IFormConfigBuilder } from '../../services/FormConfigBuilder'

export interface FormConfigProviderProps {
  children: ReactNode
  configBuilder: IFormConfigBuilder
}

export interface FormConfigContextValue {
  configBuilder: IFormConfigBuilder
}
