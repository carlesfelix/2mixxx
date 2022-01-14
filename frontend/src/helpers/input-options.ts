import RegisteredUserRoleEnum from '../enums/RegisteredUserRoleEnum';
import { TFunction } from '../services/i18n';
import InputOptions from '../types/InputOptions';
import TCallback from '../types/TCallback';
import { getLangNameByLocale, getRegisteredUserRoleName } from './input-option-labels';

export function getRoleOptions(t: TFunction): InputOptions<RegisteredUserRoleEnum> {
  return [
    {
      label: getRegisteredUserRoleName(t, RegisteredUserRoleEnum.Admin),
      value: RegisteredUserRoleEnum.Admin
    },
    {
      label: getRegisteredUserRoleName(t, RegisteredUserRoleEnum.Dj),
      value: RegisteredUserRoleEnum.Dj
    }
  ];
}

export function getLangOptions(t: TCallback): InputOptions<string> {
  return [
    {
      label: t(getLangNameByLocale(t, 'ca')),
      value: 'ca'
    },
    {
      label: t(getLangNameByLocale(t, 'en')),
      value: 'en'
    },
    {
      label: t(getLangNameByLocale(t, 'es')),
      value: 'es'
    }
  ];
}
