import { type TextSize } from '@/components/atoms/Text'
import { type BaseInputProps } from '@/core/core-hook-form'
import type InputOption from '@/types/InputOption'
import type ThemeColor from '@/types/ThemeColor'

export interface InputMultiSelectBoxProps extends BaseInputProps<string[]> {
  className?: string
  options: InputOption[]
  optionLabelSize?: TextSize
  color?: ThemeColor
  reverse?: boolean
}
