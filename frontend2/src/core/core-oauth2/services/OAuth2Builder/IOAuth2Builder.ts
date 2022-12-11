import { OAuth2ProviderComponent, UseOAuth2 } from '../../types'

export default interface IOAuth2Builder {
  getOAuth2Hook(): UseOAuth2
  getOAuth2Provider(): OAuth2ProviderComponent
}
