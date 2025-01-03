import { type ReactNode } from 'react'

export interface PageLayoutProps {
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  centerContent?: boolean
}
