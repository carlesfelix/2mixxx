import BasicButton from '@/components/atoms/BasicButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import InputTextField from '@/components/molecules/InputTextField'
import { FormValidator, useForm } from '@/core/core-hook-form'
import { useI18n, useTranslation } from '@/core/core-i18n'
import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'
import i18nModule from '@/modules/i18n'
import { ReactElement, useRef, useState } from 'react'

interface Aa {
  name: string
  fullName?: string
}
const validator: FormValidator<Aa> = (schema) => {
  return schema.object({
    name: schema.string().optional().empty('').required().messages({
      'any.required': i18nModule.t('aaa')
    }),
    fullName: schema.string().optional().empty('')
  })
}

export default function NotFoundPage (): ReactElement {
  const [count, setCount] = useState<number>(0)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()
  const {
    control,
    handleSubmit
  } = useForm<Aa>({ validator })
  const i18n = useI18n()

  function submitHandler (event: Aa): void {
    console.log(event)
  }

  function changeLanguageHandler (lang: string): void {
    i18n.changeLanguage(lang).catch((error) => {
      window.console.log(error)
    })
  }

  return (
    <div className="NotFoundPage">
      NotFoundPage
      <button onClick={() => setCount(old => old + 1)}>Count {count}</button>
      <button>{t('test')}</button>
      <button onClick={() => changeLanguageHandler('es')}>Español</button>
      <button onClick={() => changeLanguageHandler('en')}>English</button>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <InputTextField
          control={control}
          label="Nombre"
          name="name"
          inputProps={{
            placeholder: 'escribe nombre'
          }}
        />
        <InputTextField
          control={control}
          label="Nombre completo"
          name='fullName'
          inputProps={{
            placeholder: 'escribe nombre completo'
          }}
        />
        <button type="submit">enviar</button>
      </form>
      <FocusWithKeyboard disabled>
        <div>
          Group 1
          <BasicButton color="primary">Primary basic</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
        </div>
      </FocusWithKeyboard>
      <FocusWithKeyboard disabled>
        <div style={{ marginTop: 32 }}>
          Group 2
          <BasicButton ref={btnRef} color="primary">Primary basic 1</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
        </div>
      </FocusWithKeyboard>
    </div>
  )
}
