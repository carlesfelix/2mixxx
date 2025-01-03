import { type ReactNode } from 'react'
import { type TextSize } from '../Text'

export type UserInitialSize = TextSize
export interface UserInitialsProps {
  className?: string
  size?: UserInitialSize
  children: ReactNode
}
