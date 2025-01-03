import { type TextSize } from '@/components/atoms/Text'
import type RegisteredUser from '@/types/RegisteredUser'

export interface UserInfoCompactProps {
  user: RegisteredUser
  size?: TextSize
}
