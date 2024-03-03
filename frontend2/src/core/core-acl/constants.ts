import { createContext } from 'react'
import { type AclContextValue } from './types'

export const ACL_CONTEXT = createContext<AclContextValue | undefined>(undefined)
