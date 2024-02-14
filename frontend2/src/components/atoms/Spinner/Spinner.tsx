import classNames from 'classnames'
import { ReactElement } from 'react'
import './Spinner.css'
import { SpinnerProps } from './types'

export default function Spinner (props: SpinnerProps): ReactElement {
  const { color = 'current', className } = props
  const rootClassName = classNames(
    'c-spinner',
    `c-spinner--${color}`,
    className
  )
  return (
    <div className={rootClassName}>
      <div className="c-spinner__ring" />
      <div className="c-spinner__ring" />
      <div className="c-spinner__ring" />
      <div className="c-spinner__ring" />
    </div>
  )
}
