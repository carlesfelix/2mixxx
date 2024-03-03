import { type InputTextProps } from '@/components/atoms/InputText'
import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'
import { type ReactNode } from 'react'

export interface InputTextFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputTextProps, TFieldValues> {
  label?: ReactNode
}
