import { type ReactElement } from 'react'
import './UserInitials.css'
import Text from '../Text'
import { type UserInitialsProps } from './types'
import classNames from 'classnames'

export default function UserInitials (props: UserInitialsProps): ReactElement {
  const { children, size = 'medium', className } = props

  const baseClassName = classNames(
    'c-user-initials',
    className
  )
  return (
    <Text className={baseClassName} weight="bold" size={size}>
      <span className="c-user-initials__label">
        {children}
      </span>
    </Text>
  )
}
