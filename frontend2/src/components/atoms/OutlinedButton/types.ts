import ButtonSize from '@/types/ButtonSize'
import ThemeColor from '@/types/ThemeColor'
import { MouseEventHandler, ReactNode } from 'react'

export interface OutlinedButtonProps {
  children: ReactNode
  color?: ThemeColor
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: ButtonSize
}
