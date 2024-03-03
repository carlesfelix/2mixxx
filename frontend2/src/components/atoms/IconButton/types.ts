import type ButtonSize from '@/types/ButtonSize'
import type ThemeColor from '@/types/ThemeColor'
import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

export interface IconButtonProps {
  children: ReactNode
  color?: ThemeColor
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
  size?: ButtonSize
}
