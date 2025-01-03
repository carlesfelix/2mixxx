import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'
import { type InputTimeDurationProps } from '@/components/molecules/InputTimeDuration'
import { type ReactNode } from 'react'

export interface InputTimeDurationFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputTimeDurationProps, TFieldValues> {
  label?: ReactNode
}
