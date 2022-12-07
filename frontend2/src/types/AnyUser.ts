import BaseEntity from '@/core/core-types/BaseEntity'
import UserType from './UserType'

type AnyUser = {
  type: UserType;
  permissions: string[];
} & BaseEntity;

export default AnyUser
