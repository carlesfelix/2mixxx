import { type InputNumberProps } from '@/components/atoms/InputNumber'
import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'
import { type ReactNode } from 'react'

export interface InputNumberFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputNumberProps, TFieldValues> {
  label?: ReactNode
}
