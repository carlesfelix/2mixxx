import { ReactElement } from 'react'
import {
  Controller as ControllerLib,
  FieldPath,
  FieldValues
} from 'react-hook-form'
import { ControllerProps, LibRenderProps } from './types'

export default function Controller<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> (props: ControllerProps<TFieldValues, TName>): ReactElement {
  const { render, ...extraProps } = props

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
      inputErrorMessage
    })
  }

  return <ControllerLib {...extraProps} render={renderHandler} />
}