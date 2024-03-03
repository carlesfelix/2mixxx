import { createContext } from 'react'
import { type FormConfigContextValue } from '../types'

const FormConfigContext = createContext<FormConfigContextValue | undefined>(undefined)

export default FormConfigContext
