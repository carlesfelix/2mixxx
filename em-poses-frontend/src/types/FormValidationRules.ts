import FormValidationRule from './FormValidationRule';

type FormValidationRules<T> = Partial<{[K in keyof T]: FormValidationRule}>;

export default FormValidationRules;
