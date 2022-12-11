import { ReactNode } from 'react'
import OAuth2Provider from '../../components/OAuth2Provider'
import { IOAuth2Builder } from '../../services/OAuth2Builder'
import { OAuth2ProviderComponent } from '../../types'

export default function createOAuth2Provider (
  builder: IOAuth2Builder
): OAuth2ProviderComponent {
  const authHook = builder.getOAuth2Hook()
  const authProvider = builder.getOAuth2Provider()

  function Provider (props: { children: ReactNode }): JSX.Element {
    const { children } = props
    return (
      <OAuth2Provider
        authHook={authHook}
        authProvider={authProvider}
      >
        {children}
      </OAuth2Provider>
    )
  }

  return Provider
}
