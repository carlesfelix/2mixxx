import type { ReactNode } from 'react'

export type PillColor = 'warning' | 'danger' | 'success'

export interface PillProps {
  className?: string
  children: ReactNode
  color?: PillColor
}
