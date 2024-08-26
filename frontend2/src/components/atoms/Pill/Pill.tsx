import classNames from 'classnames'
import type { PillProps } from './types'
import type { ReactElement } from 'react'
import './Pill.css'
import Text from '../Text'

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
    <Text size="extra-small" weight='bold' className={rootClassName}>
      {children}
    </Text>
  )
}
