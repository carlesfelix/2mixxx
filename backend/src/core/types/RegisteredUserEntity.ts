import BaseEntity from './BaseEntity';

type RegisteredUserEntity = Partial<{
  sub: string;
  email: string;
  role: number;
}> & BaseEntity;

export default RegisteredUserEntity;
