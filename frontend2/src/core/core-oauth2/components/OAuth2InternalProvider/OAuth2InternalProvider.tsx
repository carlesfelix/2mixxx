import OAuth2InternalContext from '../../contexts/OAuth2InternalContext'
import { OAuth2InternalProviderProps } from './types'

export default function OAuth2InternalProvider (props: OAuth2InternalProviderProps) {
  const { children, authHook: useOAuth2 } = props
  const value = useOAuth2()
  return (
    <OAuth2InternalContext.Provider value={value}>
      {children}
    </OAuth2InternalContext.Provider>
  )
}
