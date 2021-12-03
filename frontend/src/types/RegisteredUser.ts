import BaseEntity from './BaseEntity';

type RegisteredUser = {
  email: string;
  role: number;
  permissions?: [];
} & BaseEntity;

export default RegisteredUser;
