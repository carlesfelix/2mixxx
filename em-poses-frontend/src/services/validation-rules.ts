import { ValidateResult, ValidationRule } from 'react-hook-form';

function required(): ValidationRule<boolean> {
  return { value: true, message: 'This field is mandatory' };
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
function email(): ValidationRule<RegExp> {
  return {
    value: /^([a-z0-9._]+@+[a-z0-9_]+\.\w{2,3})$/i,
    message: 'Invalid email format'
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
