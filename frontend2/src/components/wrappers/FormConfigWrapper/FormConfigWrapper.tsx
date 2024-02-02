import {
  FormConfigProvider
} from '@/core/core-hook-form'
import { useLanguage } from '@/core/core-i18n'
import { ReactElement, useEffect } from 'react'
import { FormConfigWrapperProps } from './types'
import { usePrevious } from '@/core/core-hooks'
import { formConfigBuilder } from '@/modules/form'

export default function FormConfigWrapper (props: FormConfigWrapperProps): ReactElement {
  const { children } = props
  const language = useLanguage()
  const previousLanguage = usePrevious(language)

  useEffect(() => {
    if (previousLanguage !== undefined && previousLanguage !== language) {
      formConfigBuilder.rebuildSchemas()
    }
  }, [language, previousLanguage])

  return (
    <FormConfigProvider configBuilder={formConfigBuilder}>
      {children}
    </FormConfigProvider>
  )
}
