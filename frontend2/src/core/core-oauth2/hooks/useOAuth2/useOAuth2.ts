import { useContext } from 'react'
import OAuth2InternalContext from '../../contexts/OAuth2InternalContext'
import { UseOAuth2Return } from '../../types'

export default function useOAuth2 (): UseOAuth2Return {
  const context = useContext(OAuth2InternalContext)

  if (context === undefined) {
    throw new Error('useOAuth2 must be used withing an OAuth2Provider')
  }

  return context
}
