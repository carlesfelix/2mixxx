import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import { getRegisteredUserRoleName } from '../helpers/registered-user-role';
import DropdownOption from '../types/DropdownOption';

export const roleOptions: DropdownOption<RegisteredUserRoleEnum>[] = [
  {
    label: getRegisteredUserRoleName(RegisteredUserRoleEnum.Admin),
    value: RegisteredUserRoleEnum.Admin
  },
  {
    label: getRegisteredUserRoleName(RegisteredUserRoleEnum.Dj),
    value: RegisteredUserRoleEnum.Dj
  }
];
