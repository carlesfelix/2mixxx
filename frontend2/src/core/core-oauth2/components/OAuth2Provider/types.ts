import { ReactNode } from 'react'
import { OAuth2ProviderComponent, UseOAuth2 } from '../../types'

export interface OAuth2ProviderProps {
  children: ReactNode
  authProvider: OAuth2ProviderComponent
  authHook: UseOAuth2
}
