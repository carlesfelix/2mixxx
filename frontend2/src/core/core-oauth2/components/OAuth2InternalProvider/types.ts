import { ReactNode } from 'react'
import { UseOAuth2 } from '../../types'

export interface OAuth2InternalProviderProps {
  children: ReactNode
  authHook: UseOAuth2
}
