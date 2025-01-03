import BasicButton from '@/components/atoms/BasicButton'
import OutlinedButton from '@/components/atoms/OutlinedButton'
import Title from '@/components/atoms/Title'
import InputCalendarField from '@/components/molecules/InputCalendarField'
import InputTextField from '@/components/molecules/InputTextField'
import { FocusContainer } from '@/core/core-focus'
import { type FormValidator, useForm, schema, asOptionalTextField } from '@/core/core-hook-form'
import { useI18n, useTranslation } from '@/core/core-i18n'
import { KEY_CODES } from '@/core/core-keyboard'
import i18n from '@/modules/i18n'
import { type ReactElement, useRef, useState } from 'react'
import HomeIcon from '@/assets/svg/Home.svg?react'
import Text from '@/components/atoms/Text'
import MenuIcon from '@/assets/svg/Menu.svg?react'
import UserInfoCompact from '@/components/molecules/UserInfoCompact'

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
      <Title size="h1" className='pepito'><HomeIcon /> <span>Title 1</span></Title>
      <Title size="h2">Title 2</Title>
      <Title size="h3">Title 3</Title>
      <Title size="h4">Title 4</Title>
      <Title size="h5">Title 5</Title>
      <Title size="h6">Title 6</Title>
      <Text>Text 6 standard</Text>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui animi quo laudantium dignissimos temporibus similique vel, laborum odit earum architecto nam placeat, fugiat aperiam deserunt atque officiis odio ipsa incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse labore voluptatibus harum eum nostrum aut, at quas animi reprehenderit quod dolore soluta quis. Suscipit, id dolores consequuntur neque dolorum aut!</Text>
      <BasicButton
        color="primary"
        onClick={() => { setCount(old => old + 1) }}
      >
        <Text weight="bold">Count {count}</Text>
      </BasicButton>
      <MenuIcon />
      <BasicButton color="primary" size="lg">Large</BasicButton>
      <BasicButton color="primary" size="sm">small</BasicButton>
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
      <FocusContainer
        prevKeyboardKeyFilter={{ code: KEY_CODES.ArrowLeft }}
        nextKeyboardKeyFilter={{ code: KEY_CODES.ArrowRight }}
      >
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
      <UserInfoCompact
        user={{
          displayName: 'Carles Fèlix Tur',
          initials: 'CF',
          email: 'carles@email.com',
          permissions: [],
          role: 'owner',
          type: 'registered'
        }}
      />
    </div>
  )
}
