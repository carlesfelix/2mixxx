import { ValidateResult, ValidationRule } from 'react-hook-form';
import validator from 'validator';

export function buildMessage<
  Options extends undefined | object = undefined
>(message: string, options?: Options): string {
  return JSON.stringify({ message, options: options || {} });
}

function required(value: boolean = true): ValidationRule<boolean> {
  return { value, message: buildMessage('Common.formValidationMessages.required') };
};
function min(value: number): ValidationRule<number> {
  return {
    value,
    message: buildMessage('Common.formValidationMessages.min', { value })
  };
}
function max(value: number): ValidationRule<number> {
  return {
    value,
    message: buildMessage('Common.formValidationMessages.max', { value })
  };
}
function minLength(value: number): ValidationRule<number> {
  return {
    value,
    message: buildMessage(
      'Common.formValidationMessages.minLength',
      { count: value }
    )
  };
}
function maxLength(value: number): ValidationRule<number> {
  return {
    value,
    message: buildMessage(
      'Common.formValidationMessages.maxLength',
      { count: value }
    )
  };
}
function email(): (value: string) => ValidateResult {
  return value => {
    return validator.isEmail(value) || buildMessage('Common.formValidationMessages.email');
  };
}
function strongPassword(): (value: string) => ValidateResult {
  return value => {
    return validator.isStrongPassword(
      value,
      {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minSymbols: 1
      }
    ) || buildMessage('Common.formValidationMessages.strongPassword');
  };
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
  customRules: { strongPassword, email }
};

export default validationRules;
