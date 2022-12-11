import { ReactNode } from 'react'

export type LoginWithRedirectOptions = {
  appState?: string;
}

export type LogoutOptions = {
  returnTo: string;
}

export type UseOAuth2Return = {
  isAuthenticated: boolean;
  inProgress: boolean;
  getAccessTokenSilently: () => Promise<string>;
  loginWithRedirect: (options?: LoginWithRedirectOptions) => Promise<void>;
  logout: (options: LogoutOptions) => void;
}

export type UseOAuth2 = () => UseOAuth2Return

export type OAuth2ProviderComponent = (props: { children: ReactNode }) => JSX.Element
