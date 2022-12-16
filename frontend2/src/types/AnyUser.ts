import BaseEntity from '@/types/BaseEntity'
import UserType from './UserType'

export default interface AnyUser extends BaseEntity {
  type: UserType
  permissions: string[]
}
