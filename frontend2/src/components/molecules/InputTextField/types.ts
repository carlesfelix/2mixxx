import { InputTextProps } from '@/components/atoms/InputText'
import { BaseInputControlledProps, FieldValues } from '@/core/core-hook-form'
import { ReactNode } from 'react'

export interface InputTextFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputTextProps, TFieldValues> {
  label?: ReactNode
}
