import { type ReactNode } from 'react'

export default interface InputOption {
  label: ReactNode
  value: string
  textLabel?: string
}
