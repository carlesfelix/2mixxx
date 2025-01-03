import { type InputCheckboxProps } from '@/components/molecules/InputCheckbox'
import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'

export interface InputCheckboxFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputCheckboxProps, TFieldValues> {}
