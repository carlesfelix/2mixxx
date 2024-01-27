import { ObjectSchema, Root } from 'joi'
import { FieldValues, UseFormProps as UseFormLibProps, UseFormReturn as UseFormLibReturn } from 'react-hook-form'

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = UseFormLibReturn<TFieldValues, TContext, TTransformedValues>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValidator<TSchema = any> = (rootSchema: Root) => ObjectSchema<TSchema>

export interface UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any
> extends Omit<UseFormLibProps<TFieldValues, TContext>, 'resolver'> {
  validator: FormValidator<TFieldValues>
}
