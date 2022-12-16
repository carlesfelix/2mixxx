import { CardProps } from './types'
import './Card.css'
import classNames from 'classnames'
import { ReactElement } from 'react'

export default function Card (props: CardProps): ReactElement {
  const { children, header, className } = props

  const rootClassName = classNames('Card', className)

  return (
    <div className={rootClassName}>
      {
        header && (
          <div className="Card__header Card__content">
            {header}
          </div>
        )
      }
      {
        children && (
          <div className="Card__body Card__content">
            {children}
          </div>
        )
      }
    </div>
  )
}
