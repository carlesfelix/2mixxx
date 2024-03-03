import { type ReactElement } from 'react'
import { type ControllerFieldState, type ControllerProps as ControllerLibProps, type ControllerRenderProps, type FieldPath, type FieldValues, type UseFormStateReturn } from 'react-hook-form'

export interface RenderProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
  showInputError: boolean
  inputErrorMessage?: string
}

export interface ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerLibProps<TFieldValues, TName>, 'render'> {
  render: (renderProps: RenderProps<TFieldValues, TName>) => ReactElement
}

export interface LibRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}
