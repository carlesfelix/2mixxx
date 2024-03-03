import {
  type LoginWithRedirectOptions,
  type LogoutOptions,
  type UseOAuth2Return
} from '../../types'
import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'

export default function useAuth0Adapter (): UseOAuth2Return {
  const {
    getAccessTokenSilently,
    loginWithRedirect: auth0LoginWithRedirect,
    logout: auth0Logout,
    isAuthenticated,
    isLoading
  } = useAuth0()

  const logout = useCallback((options: LogoutOptions) => {
    auth0Logout(options)
  }, [auth0Logout])

  const loginWithRedirect = useCallback(async (options?: LoginWithRedirectOptions) => {
    await auth0LoginWithRedirect(options)
  }, [auth0LoginWithRedirect])

  return {
    getAccessTokenSilently,
    inProgress: isLoading,
    isAuthenticated,
    logout,
    loginWithRedirect
  }
}
