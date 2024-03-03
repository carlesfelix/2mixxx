import type { CardProps } from './types'
import './Card.css'
import classNames from 'classnames'
import type { ReactElement } from 'react'

export default function Card (props: CardProps): ReactElement {
  const { children, header, className } = props

  const rootClassName = classNames('c-card', className)

  return (
    <div className={rootClassName}>
      {
        header && (
          <div className="c-card__header c-card__content">
            {header}
          </div>
        )
      }
      {
        children && (
          <div className="c-card__body c-card__content">
            {children}
          </div>
        )
      }
    </div>
  )
}
