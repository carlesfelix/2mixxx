import { type ReactNode } from 'react'
import { type OAuth2ProviderComponent, type UseOAuth2 } from '../../types'

export interface OAuth2ProviderProps {
  children: ReactNode
  authProvider: OAuth2ProviderComponent
  authHook: UseOAuth2
}
