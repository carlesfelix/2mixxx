import { ValidateResult, ValidationRule } from 'react-hook-form';
import validator from 'validator';

function required(value: boolean = true): ValidationRule<boolean> {
  return { value, message: 'This field is mandatory' };
};
function min(value: number): ValidationRule<number> {
  return { value, message: 'minRule' };
}
function max(value: number): ValidationRule<number> {
  return { value, message: 'maxRule' };
}
function minLength(value: number): ValidationRule<number> {
  return { value, message: 'minLengthRule' };
}
function maxLength(value: number): ValidationRule<number> {
  return { value, message: 'maxLengthRule' };
}
function email(): (value: string) => ValidateResult {
  return value => {
    return validator.isEmail(value) || 'Invalid email format';
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
    ) || 'Password must contain at least 8 characters, a lowercase, an uppercase and one symbol';
  };
}

function equals<TestValue = any>(test: TestValue, message: string): (value: unknown) => ValidateResult {
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
