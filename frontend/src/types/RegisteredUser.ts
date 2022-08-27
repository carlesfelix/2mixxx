import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import BaseEntity from './BaseEntity';
import User from './User';

type RegisteredUser = {
  email: string;
  role: RegisteredUserRoleEnum;
  type: 'registeredUser';
} & BaseEntity & User;

export default RegisteredUser;
