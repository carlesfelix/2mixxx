import { createElement, type ReactElement, type HTMLAttributes } from 'react'
import { type TextProps } from './types'
import classNames from 'classnames'
import './Text.css'

export default function Text <
  THTMLAttributes extends HTMLAttributes<THTMLElement>,
  THTMLElement extends HTMLElement
> (props: TextProps<THTMLAttributes, THTMLElement>): ReactElement {
  const {
    children,
    className,
    size = 'medium',
    weight = 'normal',
    as: elementType = 'span',
    asProps = {}
  } = props
  const rootClassName = classNames(
    'c-text',
    `c-text--${size}`,
    `c-text--weight-${weight}`,
    className
  )
  return createElement(elementType, { ...asProps, className: rootClassName }, children)
}
