import { useOAuth2 } from '@/core/core-oauth2'
import http from '@/modules/http'
import { useEffect } from 'react'

export default function useRegisteredUserAuthorizationInterceptor (): void {
  const { getAccessTokenSilently } = useOAuth2()
  useEffect(() => {
    // async function authorizationHeadersInterceptor () {
    //   const accessToken = await getAccessTokenSilently()
    //   return {
    //     Authorization: `Bearer ${accessToken}`,
    //     'user-type': 'registeredUser'
    //   }
    // }
    const interceptorId = http.requestInterceptors().use(async function authorizationHeadersInterceptor (config) {
      const accessToken = await getAccessTokenSilently()
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers['user-type'] = 'registeredUser'
      return config
    })

    return () => {
      http.requestInterceptors().eject(interceptorId)
    }
  }, [getAccessTokenSilently])
}
