import type { ReactNode } from 'react'

export interface InputFieldProps {
  children: ReactNode
  className?: string
  inputId: string
  label: ReactNode
  error?: ReactNode
}
