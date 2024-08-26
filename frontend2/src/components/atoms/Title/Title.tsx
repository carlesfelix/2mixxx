import { createElement, type ReactElement, type HTMLAttributes } from 'react'
import { type TitleProps } from './types'
import classNames from 'classnames'
import './Title.css'

export default function Title <
  THTMLAttributes extends HTMLAttributes<THTMLElement>,
  THTMLElement extends HTMLElement
> (props: TitleProps<THTMLAttributes, THTMLElement>): ReactElement {
  const {
    children,
    className,
    size,
    weight = 'bold',
    as: elementType = size,
    asProps = {}
  } = props
  const rootClassName = classNames(
    'c-title',
    `c-title--${size}`,
    `c-title--weight-${weight}`,
    className
  )
  return createElement(elementType, { ...asProps, className: rootClassName }, children)
}
