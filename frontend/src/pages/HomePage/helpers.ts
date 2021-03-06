import validationRules from '../../helpers/validation-rules';
import FormValidation from '../../types/FormValidation';

export const getRoomFormValidation: FormValidation<
  { roomCode?: string }
> = () => {
  return {
    roomCode: { required: validationRules.required() }
  };
};
