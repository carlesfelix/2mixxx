import type ThemeColor from '@/types/ThemeColor'
import type { ReactNode } from 'react'

export type PillColor = ThemeColor | 'warning' | 'danger' | 'success'

export interface PillProps {
  className?: string
  children: ReactNode
  color?: PillColor
}
