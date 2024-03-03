import type { BaseInputProps } from '@/core/core-hook-form'

export interface InputTextProps extends BaseInputProps<string> {
  placeholder?: string
  className?: string
}
