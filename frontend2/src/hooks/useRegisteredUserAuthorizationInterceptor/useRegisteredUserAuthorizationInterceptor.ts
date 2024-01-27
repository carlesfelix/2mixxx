import { useOAuth2 } from '@/core/core-oauth2'
import http from '@/modules/http'
import { useEffect } from 'react'

export default function useRegisteredUserAuthorizationInterceptor (): void {
  const { getAccessTokenSilently } = useOAuth2()
  useEffect(() => {
    async function authorizationHeadersInterceptor (): Promise<Record<string, string>> {
      const accessToken = await getAccessTokenSilently()
      return {
        Authorization: `Bearer ${accessToken}`,
        'user-type': 'registeredUser'
      }
    }
    const interceptorId = http.useRequestHeadersInterceptor(
      authorizationHeadersInterceptor
    )

    return () => {
      http.ejectRequestInterceptor(interceptorId)
    }
  }, [getAccessTokenSilently])
}
