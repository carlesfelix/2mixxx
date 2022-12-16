import classNames from 'classnames'
import { ReactElement } from 'react'
import './Spinner.css'
import { SpinnerProps } from './types'

export default function Spinner (props: SpinnerProps): ReactElement {
  const { color = 'current', className } = props
  const rootClassName = classNames(
    'Spinner',
    `Spinner--${color}`,
    className
  )
  return (
    <div className={rootClassName}>
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
      <div className="Spinner__ring" />
    </div>
  )
}
