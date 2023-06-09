import ButtonSize from '@/types/ButtonSize'
import ThemeColor from '@/types/ThemeColor'
import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

export interface IconButtonProps {
  children: ReactNode
  color?: ThemeColor
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
  size?: ButtonSize
}
