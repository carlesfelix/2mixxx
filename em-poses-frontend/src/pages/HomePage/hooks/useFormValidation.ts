import validationRules from '../../../services/validation-rules';
import UseFormValidation from '../../../types/UseFormValiation';

const useFormValidation: UseFormValidation<{ roomCode?: string }> = () => {
  return {
    roomCode: {
      required: validationRules.required()
    }
  };
};

export default useFormValidation;
