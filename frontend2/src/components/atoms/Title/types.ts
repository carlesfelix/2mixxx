import { type ClassAttributes, type HTMLAttributes, type ReactHTML, type ReactNode } from 'react'

export type TitleSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type TitleWeight = 'normal' | 'semi-bold' | 'bold' | 'extra-bold'
export interface TitleProps <THTMLAttributes extends HTMLAttributes<THTMLElement>, THTMLElement extends HTMLElement> {
  className?: string
  children: ReactNode
  weight?: TitleWeight
  size: TitleSize
  as?: keyof ReactHTML
  asProps?: ClassAttributes<THTMLElement> & THTMLAttributes | null
}
