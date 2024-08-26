import { type ClassAttributes, type HTMLAttributes, type ReactHTML, type ReactNode } from 'react'

export type TextSize = 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small'
export type TitleWeight = 'semi-bold' | 'normal' | 'bold' | 'extra-bold'
export interface TextProps <THTMLAttributes extends HTMLAttributes<THTMLElement>, THTMLElement extends HTMLElement> {
  className?: string
  children: ReactNode
  size?: TextSize
  weight?: TitleWeight
  as?: keyof ReactHTML
  asProps?: ClassAttributes<THTMLElement> & THTMLAttributes | null
}
