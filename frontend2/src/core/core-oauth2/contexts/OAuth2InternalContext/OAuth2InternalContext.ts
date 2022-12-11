import { createContext } from 'react'
import { UseOAuth2Return } from '../../types'

const OAuth2InternalContext = createContext<
  UseOAuth2Return | undefined
>(undefined)

export default OAuth2InternalContext
