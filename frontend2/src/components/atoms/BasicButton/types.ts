import type ButtonSize from '@/types/ButtonSize'
import type ThemeColor from '@/types/ThemeColor'
import type { MouseEventHandler, ReactNode } from 'react'

export interface BasicButtonProps {
  children: ReactNode
  color?: ThemeColor
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: ButtonSize
}
