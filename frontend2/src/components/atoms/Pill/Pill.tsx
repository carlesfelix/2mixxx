import classNames from 'classnames'
import { PillProps } from './types'
import './Pill.css'
import { ReactElement } from 'react'

export default function Pill (props: PillProps): ReactElement {
  const {
    children,
    color = 'primary',
    className
  } = props

  const rootClassName = classNames(
    'c-pill',
    `c-pill--${color}`,
    className
  )

  return (
    <span className={rootClassName}>
      {children}
    </span>
  )
}
