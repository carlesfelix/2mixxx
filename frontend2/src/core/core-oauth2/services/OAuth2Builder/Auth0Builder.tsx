/* eslint-disable react/prop-types */
import type IOAuth2Builder from './IOAuth2Builder'
import { type OAuth2ProviderComponent, type UseOAuth2 } from '../../types'
import {
  Auth0Provider as Auth0ProviderLib,
  type Auth0ProviderOptions
} from '@auth0/auth0-react'
import useAuth0Adapter from '../../hooks/useAuth0Adapter'

export default class Auth0Builder implements IOAuth2Builder {
  readonly #options: Auth0ProviderOptions

  constructor (options: Auth0ProviderOptions) {
    this.#options = options
  }

  getOAuth2Provider (): OAuth2ProviderComponent {
    const OAuth2Provider: OAuth2ProviderComponent = (props) => (
      <Auth0ProviderLib {...this.#options}>
        {props.children}
      </Auth0ProviderLib>
    )
    return OAuth2Provider
  }

  getOAuth2Hook (): UseOAuth2 {
    return useAuth0Adapter
  }
}
