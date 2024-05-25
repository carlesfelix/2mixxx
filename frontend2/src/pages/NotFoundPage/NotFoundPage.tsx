import BasicButton from '@/components/atoms/BasicButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import InputCalendarField from '@/components/molecules/InputCalendarField'
import InputTextField from '@/components/molecules/InputTextField'
import { FocusContainer } from '@/core/core-focus'
import { type FormValidator, useForm, schema, asOptionalTextField } from '@/core/core-hook-form'
import { useI18n, useTranslation } from '@/core/core-i18n'
import i18n from '@/modules/i18n'
import { type ReactElement, useRef, useState } from 'react'

interface AaSchema {
  name: string
  fullName?: string
  aa: Date
}

const validator: FormValidator<AaSchema> = () => {
  return schema.object({
    name: schema.string().min(1, i18n.t('aaa')),
    fullName: asOptionalTextField(schema.string().min(1)),
    aa: schema.date()
  })
}

export default function NotFoundPage (): ReactElement {
  const [count, setCount] = useState<number>(0)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()
  const {
    control,
    handleSubmit
  } = useForm<AaSchema>({ validator })
  const i18n = useI18n()

  function submitHandler (event: AaSchema): void {
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
      <BasicButton
        color="primary"
        onClick={() => { setCount(old => old + 1) }}
      >
        Count {count}
      </BasicButton>
      <BasicButton color="primary">{t('test')}</BasicButton>
      <BasicButton color="primary" onClick={() => { changeLanguageHandler('es') }}>Español</BasicButton>
      <BasicButton color="primary" onClick={() => { changeLanguageHandler('en') }}>English</BasicButton>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(submitHandler)} className="g-form g-form--3">
        <InputTextField
          className="g-form__field g-form__field--3 g-form__field--sm-2 g-form__field--lg-1"
          control={control}
          label="Nombre"
          name="name"
          inputProps={{
            placeholder: 'escribe nombre'
          }}
        />
        <InputCalendarField
          className="g-form__field g-form__field--3 g-form__field--sm-3 g-form__field--lg-1"
          control={control}
          label="Email"
          name='aa'
          inputProps={{}}
        />
        <InputTextField
          className="g-form__field g-form__field--3 g-form__field--sm-1 g-form__field--lg-1"
          control={control}
          label="Nombre completo"
          name='fullName'
          inputProps={{
            placeholder: 'escribe nombre completo'
          }}
        />
        <InputTextField
          className="g-form__field g-form__field--3 g-form__field--sm-3 g-form__field--lg-1"
          control={control}
          label="Email"
          name='fullName'
          inputProps={{
            placeholder: 'email'
          }}
        />
        <button type="submit">enviar</button>
      </form>
      <FocusContainer prevNavigationConfig={{ code: 'ArrowLeft' }} nextNavigationConfig={{ code: 'ArrowRight' }}>
        <div>
          Group 1
          <BasicButton color="primary">Primary basic</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary">Outlined secondary</OutlinedButton>
        </div>
      </FocusContainer>
      <FocusContainer>
        <div style={{ marginTop: 32 }}>
          Group 2
          <BasicButton ref={btnRef} color="primary">Primary basic 1</BasicButton>
          <BasicButton color="secondary">Secondary basic</BasicButton>
          <OutlinedButton color="primary">Outlined primary</OutlinedButton>
          <OutlinedButton color="secondary" onClick={() => btnRef.current?.focus()}>Outlined secondary</OutlinedButton>
        </div>
      </FocusContainer>
    </div>
  )
}
