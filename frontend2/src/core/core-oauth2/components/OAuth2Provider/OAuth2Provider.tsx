import { ReactElement } from 'react'
import OAuth2InternalProvider from '../OAuth2InternalProvider'
import { OAuth2ProviderProps } from './types'

export default function OAuth2Provider (
  props: OAuth2ProviderProps
): ReactElement {
  const { children, authHook, authProvider: AuthProvider } = props
  return (
    <AuthProvider>
      <OAuth2InternalProvider authHook={authHook}>
        {children}
      </OAuth2InternalProvider>
    </AuthProvider>
  )
}
