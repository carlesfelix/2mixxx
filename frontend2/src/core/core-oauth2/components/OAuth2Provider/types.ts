import { ReactNode } from 'react'
import { OAuth2ProviderComponent, UseOAuth2 } from '../../types'

export type OAuth2ProviderProps = {
  children: ReactNode;
  authProvider: OAuth2ProviderComponent;
  authHook: UseOAuth2;
}
