import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import TCallback from '../types/TCallback';

export function getRegisteredUserRoleName(
  t: TCallback,
  role: RegisteredUserRoleEnum
): string {
  const roleNames = {
    [RegisteredUserRoleEnum.Admin]: 'Admin',
    [RegisteredUserRoleEnum.Dj]: 'Deejay'
  };
  return t(roleNames[role]);
}

export function getLangNameByLocale(
  t: TCallback,
  locale: string
): string {
  return t(`Common.inputOptions.languages.${locale}.label`);
}
