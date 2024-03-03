import { type ReactNode } from 'react'
import { type UseOAuth2 } from '../../types'

export interface OAuth2InternalProviderProps {
  children: ReactNode
  authHook: UseOAuth2
}
