import { ReactElement } from 'react'
import { FormConfigProviderProps } from '../types'
import FormConfigContext from '../FormConfigContext'

export default function FormConfigProvider (
  props: FormConfigProviderProps
): ReactElement {
  const { children, configBuilder } = props
  return (
    <FormConfigContext.Provider value={{ configBuilder }}>
      {children}
    </FormConfigContext.Provider>
  )
}
