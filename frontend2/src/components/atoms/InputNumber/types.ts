import type { BaseInputProps } from '@/core/core-hook-form'

export interface InputNumberProps extends BaseInputProps<number> {
  placeholder?: string
  className?: string
}
