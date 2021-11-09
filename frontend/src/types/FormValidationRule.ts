import { Message, ValidateResult, ValidationRule } from 'react-hook-form';

type FormValidationRule = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
  validate: (value: any) => ValidateResult | Promise<ValidateResult>;
}>;

export default FormValidationRule;
