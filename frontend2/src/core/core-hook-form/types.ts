import {
  type Control,
  type FieldPath,
  type FieldPathValue as LibFieldPathValue,
  type FieldValues as LibFieldValues
} from 'react-hook-form'

export type FieldValues = LibFieldValues

export type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = LibFieldPathValue<TFieldValues, TFieldPath>

export interface BaseInputProps<T> {
  value: T
  onChange: (value: T) => void
  onBlur?: () => void
  disabled?: boolean
  error?: boolean
}

export interface BaseInputControlledProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InputProps extends BaseInputProps<any>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  inputProps: Omit<InputProps, keyof BaseInputProps<unknown>>
  className?: string
  name: TName
  control: Control<TFieldValues>
  defaultValue?: FieldPathValue<TFieldValues, TName>
  disabled?: boolean
}
