import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import BaseEntity from './BaseEntity';

type RegisteredUser = {
  email: string;
  role: RegisteredUserRoleEnum;
  permissions?: [];
} & BaseEntity;

export default RegisteredUser;
