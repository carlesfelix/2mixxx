import { type ReactNode } from 'react'

export interface AsyncLayoutProps {
  children: ReactNode
  error?: Error | boolean
  errorContent?: ReactNode
  inProgress?: boolean
  inProgressContent?: ReactNode
}
