import validationRules from '../../../../services/validation-rules';
import RegisteredUser from '../../../../types/RegisteredUser';
import UseFormValidation from '../../../../types/UseFormValiation';

const useFormValidation: UseFormValidation<Partial<RegisteredUser>> = () => {
  return {
    email: {
      required: validationRules.required(),
      pattern: validationRules.patterns.email()
    },
    role: {
      required: validationRules.required()
    }
  };
};

export default useFormValidation;
