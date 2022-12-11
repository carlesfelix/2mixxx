import { Auth0Builder, createOAuth2Provider } from '@/core/core-oauth2'
import ENVIRONMENT from '@/environment'

const oAuth2Builder = new Auth0Builder({
  clientId: ENVIRONMENT.AUTH0_CLIENT_ID,
  domain: ENVIRONMENT.AUTH0_DOMAIN,
  redirectUri: window.location.origin,
  audience: `https://${ENVIRONMENT.AUTH0_DOMAIN}/api/v2/`
})

const OAuth2ProviderLayout = createOAuth2Provider(oAuth2Builder)

export default OAuth2ProviderLayout
