import FormValidationRules from './FormValidationRules';

type FormValidation<T = any, K = void> = (deps: K) => FormValidationRules<T>;

export default FormValidation;
