import { Control } from 'react-hook-form';
import FormValidationRules from './FormValidationRules';

type UseFormValidation<T> = (control: Control<T>, defaultValues?: Partial<T>) => FormValidationRules<T>;

export default UseFormValidation;
