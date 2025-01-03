import { type ReactElement } from 'react'
import UserInitials from '@/components/atoms/UserInitials'
import { type UserInfoCompactProps } from './types'
import Text from '@/components/atoms/Text'
import './UserInfoCompact.css'

export default function UserInfoCompact (props: UserInfoCompactProps): ReactElement {
  const { user, size } = props
  const { displayName, initials } = user
  return (
    <div className="c-user-info-compact">
      <UserInitials size={size}>{initials}</UserInitials>
      <Text size={size}>{displayName}</Text>
    </div>
  )
}
