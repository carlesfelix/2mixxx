import { ReactElement, useEffect, useState } from 'react'
import { FormConfigProviderProps } from '../types'
import { ValidationOptions } from 'joi'
import useSchema from '../../../hooks/useSchema'
import FormConfigContext from '../FormConfigContext'
import { AsyncLayout } from '@/core/core-async-layout'

export default function FormConfigProvider<Options> (
  props: FormConfigProviderProps<Options>
): ReactElement {
  const { children, schemaValidationBuilder, schemaOptions, fallback } = props
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [validationOptions, setValidationOptions] = useState<Partial<ValidationOptions>>({
    messages: {}
  })
  const schema = useSchema(validationOptions)
  useEffect(() => {
    schemaValidationBuilder.loadErrorMessages(schemaOptions).then((messages) => {
      if (messages) {
        setValidationOptions(old => ({
          ...old,
          messages
        }))
      }
    }).catch((error) => {
      window.console.error(error)
    }).finally(() => {
      setFirstLoad(false)
    })
  }, [schemaOptions, schemaValidationBuilder])

  return (
    <FormConfigContext.Provider value={{ schema }}>
      <AsyncLayout inProgress={firstLoad} inProgressContent={fallback}>
        {children}
      </AsyncLayout>
    </FormConfigContext.Provider>
  )
}
