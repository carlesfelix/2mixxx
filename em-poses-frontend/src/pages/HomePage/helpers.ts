import validationRules from '../../services/validation-rules';
import FormValidation from '../../types/FormValidation';

export const getRoomFormValidation: FormValidation<{ roomCode?: string }> = () => {
  return {
    roomCode: { required: validationRules.required() }
  };
};
