import BaseEntity from './BaseEntity';

type RegisteredUserEntity = Partial<{
  sub: string;
  email: string;
  role: number;
  permissions?: string[]
}> & BaseEntity;

export default RegisteredUserEntity;
