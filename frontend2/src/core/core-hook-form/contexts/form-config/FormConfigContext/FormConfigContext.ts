import { createContext } from 'react'
import { FormConfigContextValue } from '../types'

const FormConfigContext = createContext<FormConfigContextValue | undefined>(undefined)

export default FormConfigContext
