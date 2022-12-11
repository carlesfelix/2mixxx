/* eslint-disable react/prop-types */
import IOAuth2Builder from './IOAuth2Builder'
import { OAuth2ProviderComponent, UseOAuth2 } from '../../types'
import {
  Auth0Provider as Auth0ProviderLib,
  Auth0ProviderOptions
} from '@auth0/auth0-react'
import useAuth0Adapter from '../../hooks/useAuth0Adapter'
import { ReactNode } from 'react'

export default class Auth0Builder implements IOAuth2Builder {
  #options: Auth0ProviderOptions

  constructor (options: Auth0ProviderOptions) {
    this.#options = options
  }

  getOAuth2Provider (): OAuth2ProviderComponent {
    const OAuth2Provider = (props: { children: ReactNode }) => (
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
