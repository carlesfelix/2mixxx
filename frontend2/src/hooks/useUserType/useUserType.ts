import { useOAuth2 } from '@/core/core-oauth2'
import { UseUserTypeReturn } from './types'

export default function useUserType (): UseUserTypeReturn {
  const { isAuthenticated, inProgress } = useOAuth2()

  // TODO
  // const {
  //   isAuthenticated: isAuthenticatedEventUser,
  //   inProgress: inProgressEventUser
  // } = useEventUserAuth()

  return {
    inProgress,
    type: isAuthenticated ? 'registered' : 'none'
  }
}
