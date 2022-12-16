import { FunctionComponent, ReactNode } from 'react'

export interface LoginWithRedirectOptions {
  appState?: string
}

export interface LogoutOptions {
  returnTo: string
}

export interface UseOAuth2Return {
  isAuthenticated: boolean
  inProgress: boolean
  getAccessTokenSilently: () => Promise<string>
  loginWithRedirect: (options?: LoginWithRedirectOptions) => Promise<void>
  logout: (options: LogoutOptions) => void
}

export type UseOAuth2 = () => UseOAuth2Return

export type OAuth2ProviderComponent = FunctionComponent<{ children: ReactNode }>
