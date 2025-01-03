import { type TextSize } from '@/components/atoms/Text'
import { type BaseInputProps } from '@/core/core-hook-form'
import type ThemeColor from '@/types/ThemeColor'
import { type ReactNode } from 'react'

export interface InputCheckboxProps extends BaseInputProps<boolean> {
  id?: string
  label: ReactNode
  labelClassName?: string
  labelSize?: TextSize
  className?: string
  reverse?: boolean
  color?: ThemeColor
}
