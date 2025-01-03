import { type BaseInputProps } from '@/core/core-hook-form'
import type InputOption from '@/types/InputOption'
import type ThemeColor from '@/types/ThemeColor'

export interface InputMultiSelectProps extends BaseInputProps<string[]> {
  className?: string
  options: InputOption[]
  placeholder?: string
  color?: ThemeColor
  reverse?: boolean
}
