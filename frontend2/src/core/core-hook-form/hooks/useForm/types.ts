import {
  FieldValues,
  UseFormProps as UseFormLibProps,
  UseFormReturn as UseFormLibReturn
} from 'react-hook-form'
import schema from '../../services/schema'

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = UseFormLibReturn<TFieldValues, TContext, TTransformedValues>

export type FormValidator<TSchema> = () => schema.ZodType<TSchema>

export interface UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any
> extends Omit<UseFormLibProps<TFieldValues, TContext>, 'resolver'> {
  validator: FormValidator<TFieldValues>
}
