import BaseEntity from './BaseEntity';

type RegisteredUser = {
  email: string;
  role: number;
} & BaseEntity;

export default RegisteredUser;
