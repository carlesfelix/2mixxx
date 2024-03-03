import { useContext } from 'react'
import { type FormConfigContextValue } from '../types'
import FormConfigContext from '../FormConfigContext'

export default function useFormConfigContext (): FormConfigContextValue {
  const context = useContext(FormConfigContext)
  if (context === undefined) {
    throw new Error('useFormConfigContext must be used within an FormConfigProvider')
  }
  return context
}
