import { type BaseInputControlledProps, type FieldValues } from '@/core/core-hook-form'
import { type ReactNode } from 'react'
import { type InputCalendarProps } from '../InputCalendar/types'

export interface InputCalendarFieldProps<TFieldValues extends FieldValues> extends BaseInputControlledProps<InputCalendarProps, TFieldValues> {
  label?: ReactNode
}
