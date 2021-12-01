import BaseEntity from './BaseEntity';

type RegisteredUserEntity = {
  sub: string;
  email: string;
  role: number;
} & BaseEntity;

export default RegisteredUserEntity;
