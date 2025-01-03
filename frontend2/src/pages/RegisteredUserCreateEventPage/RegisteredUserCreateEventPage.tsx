import BasicButton from '@/components/atoms/BasicButton'
import PageLayout from '@/components/layout/PageLayout'
import Fieldset from '@/components/molecules/Fieldset'
import InputCalendarField from '@/components/molecules/InputCalendarField'
import InputMultiSelectField from '@/components/molecules/InputMultiSelectField'
import InputNumberField from '@/components/molecules/InputNumberField'
import InputTextField from '@/components/molecules/InputTextField'
import InputTimeDurationField from '@/components/molecules/InputTimeDurationField'
import { type FormValidator, useForm, schema } from '@/core/core-hook-form'
import i18n from '@/modules/i18n'
import './RegisteredUserCreateEventPage.css'

import { type ReactElement } from 'react'

type EventStatus = 'offline' | 'ready' | 'online'

interface CreateEventFormSchema {
  title: string
  accessCode: string
  startsAt: Date
  placeName: string
  status: EventStatus
  maxTimeOnline?: number
  maxParticipantsOnline?: number
  moderators: string[]
}

const validator: FormValidator<CreateEventFormSchema> = () => {
  return schema.object({
    title: schema.string().min(1, i18n.t('errorrrrrr title')),
    accessCode: schema.string().min(1, i18n.t('errorrrrrr access code')),
    startsAt: schema.date(),
    placeName: schema.string().min(1, i18n.t('errorrrrrr placeName')),
    status: schema.union([
      schema.literal('offline'),
      schema.literal('ready'),
      schema.literal('online')
    ]),
    maxTimeOnline: schema.number().optional(),
    moderators: schema.array(schema.string())
  })
}

export default function RegisteredUserCreateEventPage (): ReactElement {
  const {
    control,
    handleSubmit
  } = useForm<CreateEventFormSchema>({ validator })

  async function submitHandler (records: CreateEventFormSchema): Promise<void> {
    await Promise.resolve()
  }

  return (
    <PageLayout
      className="c-registered-user-create-event-page"
      title="Create a new event"
      centerContent
      footer={
        <div className='g-layout g-layout--page-content c-registered-user-create-event-page__footer'>
          <BasicButton color="primary">Crear</BasicButton>
        </div>
      }
    >
      <section className='g-layout g-layout--page-content'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(submitHandler)} className="g-form g-form--4">
          <div>
            <Fieldset className="g-form__fieldset">
              <InputTextField
                className="g-form__field g-form__field--4 g-form__field--sm-2 g-form__field--lg-2"
                control={control}
                label="Titulo"
                name="title"
                inputProps={{}}
                required
              />
              <InputTextField
                className="g-form__field g-form__field--4 g-form__field--sm-2 g-form__field--lg-2"
                control={control}
                label="Lugar"
                name="placeName"
                inputProps={{}}
              />
              <InputCalendarField
                className="g-form__field g-form__field--4 g-form__field--sm-2 g-form__field--lg-1"
                control={control}
                label="Fecha"
                name="startsAt"
                inputProps={{}}
              />
              <InputTextField
                className="g-form__field g-form__field--4 g-form__field--sm-2 g-form__field--lg-1"
                control={control}
                label="Código de acceso"
                name="accessCode"
                inputProps={{}}
              />
              <InputNumberField
                className="g-form__field g-form__field--4 g-form__field--sm-4 g-form__field--lg-2"
                control={control}
                label="Límite de participantes"
                name="maxParticipantsOnline"
                inputProps={{}}
              />
              <InputTimeDurationField
                className="g-form__field g-form__field--4 g-form__field--sm-4 g-form__field--lg-2"
                control={control}
                label="Duración máxima en línea"
                name="maxTimeOnline"
                defaultValue={2 * 60 * 60 * 1000}
                inputProps={{
                  precisions: ['hours', 'minutes']
                }}
              />
              <InputMultiSelectField
                className="g-form__field g-form__field--4 g-form__field--sm-4 g-form__field--lg-2"
                control={control}
                label="Moderadores"
                name="moderators"
                inputProps={{
                  placeholder: 'Selecciona moderadores',
                  options: [
                    {
                      label: 'Carles Fèlix Tur',
                      value: 'option1'
                    },
                    {
                      label: 'Juan García Pérez',
                      value: 'option2'
                    },
                    {
                      label: 'Carles Fèlix Tur 2',
                      value: 'option3'
                    },
                    {
                      label: 'Juan García Pérez 2',
                      value: 'option4'
                    },
                    {
                      label: 'Carles Fèlix Tur',
                      value: 'option5'
                    },
                    {
                      label: 'Juan García Pérez',
                      value: 'option6'
                    },
                    {
                      label: 'Carles Fèlix Tur 2',
                      value: 'option7'
                    },
                    {
                      label: 'Juan García Pérez 2',
                      value: 'option8'
                    }
                  ]
                }}
              />
            </Fieldset>
          </div>

          {/* <button type="submit">Enviar</button> */}
        </form>
      </section>
    </PageLayout>
  )
}
