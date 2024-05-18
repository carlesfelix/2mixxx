import { createContext } from 'react'
import { type FocusContextValue } from './types'

const FocusContext = createContext<FocusContextValue | undefined>(undefined)
export default FocusContext
