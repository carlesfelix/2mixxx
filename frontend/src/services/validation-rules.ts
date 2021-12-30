import { ValidateResult, ValidationRule } from 'react-hook-form';
import validator from 'validator';
import { TFunction } from './i18n';

function required(t: TFunction,value: boolean = true): ValidationRule<boolean> {
  return { value, message: t('Common.formValidationMessages.required') };
};
function min(t: TFunction, value: number): ValidationRule<number> {
  return {
    value,
    message: t('Common.formValidationMessages.min', { value })
  };
}
function max(t: TFunction, value: number): ValidationRule<number> {
  return {
    value,
    message: t('Common.formValidationMessages.max', { value })
  };
}
function minLength(t: TFunction, value: number): ValidationRule<number> {
  return {
    value,
    message: t('Common.formValidationMessages.minLength', { count: value })
  };
}
function maxLength(t: TFunction, value: number): ValidationRule<number> {
  return {
    value,
    message: t('Common.formValidationMessages.maxLength', { count: value })
  };
}
function email(t: TFunction): (value: string) => ValidateResult {
  return value => {
    return validator.isEmail(value) || t('Common.formValidationMessages.email') as string;
  };
}
function strongPassword(t: TFunction): (value: string) => ValidateResult {
  return value => {
    return validator.isStrongPassword(
      value,
      {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minSymbols: 1
      }
    ) || t('Common.formValidationMessages.strongPassword') as string;
  };
}

function equals<TestValue = any>(
  test: TestValue, message: string
): (value: unknown) => ValidateResult {
  return value => value === test || message;
}

export function composeCustomRules(chain: ((value: any) => ValidateResult | Promise<ValidateResult>)[]): (value: any) => Promise<ValidateResult> {
  return async value => {
    for(const validationRule of chain) {
      const validation = validationRule(value);
      if (validation === false || typeof validation !== 'boolean') {
        return validation;
      }
    }
    return true;
  }
}

const validationRules = {
  required, min, max, minLength, maxLength,
  customRules: { equals, strongPassword, email }
};

export default validationRules;
