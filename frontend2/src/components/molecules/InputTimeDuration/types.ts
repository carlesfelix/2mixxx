import { type FormatTimePrecision } from '@/core/core-date'
import { type BaseInputProps } from '@/core/core-hook-form'

export interface InputTimeDurationProps extends BaseInputProps<number> {
  precisions: FormatTimePrecision[]
  className?: string
  negative?: boolean
}
