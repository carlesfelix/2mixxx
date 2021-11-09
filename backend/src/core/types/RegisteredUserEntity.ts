import BaseEntity from './BaseEntity';

type RegisteredUserEntity = {
  email: string;
  role: number;
} & BaseEntity;

export default RegisteredUserEntity;
