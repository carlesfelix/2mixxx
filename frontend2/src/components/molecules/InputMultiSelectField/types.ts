import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'
import { type ReactNode } from 'react'
import { type InputMultiSelectProps } from '../InputMultiSelect'

export interface InputMultiSelectFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputMultiSelectProps, TFieldValues> {
  label?: ReactNode
}
