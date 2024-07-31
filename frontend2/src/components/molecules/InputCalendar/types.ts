import { type BaseInputProps } from '@/core/core-hook-form'

export type InputCalendarPartialValue = Date | null
export interface InputCalendarProps extends BaseInputProps<InputCalendarPartialValue | [InputCalendarPartialValue, InputCalendarPartialValue]> {
  className?: string
  range?: boolean
}
