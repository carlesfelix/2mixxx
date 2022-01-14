import FormValidationRules from './FormValidationRules';

type FormValidation<T = any, K extends any[] = []> = (...deps: K) => FormValidationRules<T>;

export default FormValidation;
