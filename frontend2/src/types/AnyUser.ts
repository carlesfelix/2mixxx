import type BaseEntity from '@/types/BaseEntity'
import type UserType from './UserType'

export default interface AnyUser extends BaseEntity {
  type: UserType
  permissions: string[]
}
