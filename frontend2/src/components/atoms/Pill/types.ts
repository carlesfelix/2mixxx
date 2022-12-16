import ThemeColor from '@/types/ThemeColor'
import { ReactNode } from 'react'

export type PillColor = ThemeColor | 'warning' | 'danger' | 'success'

export interface PillProps {
  className?: string
  children: ReactNode
  color?: PillColor
}
