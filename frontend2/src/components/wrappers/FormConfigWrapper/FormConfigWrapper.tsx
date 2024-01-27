import {
  FormConfigProvider,
  SchemaValidationBuilderOptions
} from '@/core/core-hook-form'
import { useLanguage } from '@/core/core-i18n'
import { ReactElement, useEffect, useState } from 'react'
import schemaValidationBuilder from './services/schema-validation-builder'
import { FormConfigWrapperProps } from './types'
import { usePrevious } from '@/core/core-hooks'
import Spinner from '@/components/atoms/Spinner'

export default function FormConfigWrapper (props: FormConfigWrapperProps): ReactElement {
  const { children } = props
  const language = useLanguage()
  const previousLanguage = usePrevious(language)
  const [schemaOptions, setSchemaOptions] = useState<SchemaValidationBuilderOptions>(() => ({
    language
  }))

  useEffect(() => {
    if (previousLanguage !== undefined && previousLanguage !== language) {
      setSchemaOptions({ language })
    }
  }, [language, previousLanguage])

  return (
    <FormConfigProvider
      schemaValidationBuilder={schemaValidationBuilder}
      schemaOptions={schemaOptions}
      fallback={
        <div className="_layout _layout--center">
          <Spinner color="primary" />
        </div>
      }
    >
      {children}
    </FormConfigProvider>
  )
}
