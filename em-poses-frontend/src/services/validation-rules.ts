import { ValidateResult, ValidationRule } from 'react-hook-form';

function required(message?: string): ValidationRule<boolean> {
  return { value: true, message: message || 'This field is mandatory' };
};
function min(value: number, message?: string): ValidationRule<number> {
  return { value, message: message || 'minRule' };
}
function max(value: number, message?: string): ValidationRule<number> {
  return { value, message: message || 'maxRule' };
}
function minLength(value: number, message?: string): ValidationRule<number> {
  return { value, message: message || 'minLengthRule' };
}
function maxLength(value: number, message?: string): ValidationRule<number> {
  return { value, message: message || 'maxLengthRule' };
}
function email(message?: string): ValidationRule<RegExp> {
  return {
    value: /^([a-z0-9._]+@+[a-z0-9_]+\.\w{2,3})$/i,
    message: message || 'Invalid email format'
  };
}

function equals(test: string, message: string): (value: string) => ValidateResult {
  return value => value === test || message;
}

export function composeCustomRules(chain: ((value: any) => ValidateResult)[]): (value: any) => ValidateResult {
  return value => {
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
  patterns: { email },
  customRules: { equals }
};

export default validationRules;
