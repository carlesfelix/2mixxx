import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import { TFunction } from '../services/i18n';
import TCallback from '../types/TCallback';

export function getRegisteredUserRoleName(
  t: TFunction,
  role: RegisteredUserRoleEnum
): string {
  const roleNames = {
    [RegisteredUserRoleEnum.Admin]: t('Common.registeredUserRoles.admin'),
    [RegisteredUserRoleEnum.Dj]: t('Common.registeredUserRoles.dj')
  };
  return t(roleNames[role]);
}

export function getLangNameByLocale(
  t: TCallback,
  locale: string
): string {
  return t(`Common.inputOptions.languages.${locale}.label`);
}
