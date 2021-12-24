import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';

export function getRegisteredUserRoleName(role: RegisteredUserRoleEnum): string {
  const roleNames = {
    [RegisteredUserRoleEnum.Admin]: 'Admin',
    [RegisteredUserRoleEnum.Dj]: 'Deejay'
  };
  return roleNames[role];
}
