import { useId, type ReactElement } from 'react'
import {
  Controller as ControllerLib,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'
import { type ControllerProps, type LibRenderProps } from './types'

export default function Controller<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (props: ControllerProps<TFieldValues, TName>): ReactElement {
  const { render, inputId, ...extraProps } = props
  const internalInputId = useId()
  const id = inputId ?? internalInputId

  function renderHandler (
    renderProps: LibRenderProps<TFieldValues, TName>
  ): ReactElement {
    const { field, fieldState, formState } = renderProps
    const inputErrorMessage = fieldState.invalid ? fieldState.error?.message : undefined
    return render({
      field,
      fieldState,
      formState,
      showInputError: !!inputErrorMessage,
      inputErrorMessage,
      id
    })
  }

  return <ControllerLib {...extraProps} render={renderHandler} />
}
