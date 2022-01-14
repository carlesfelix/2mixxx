import { TFunction } from '../../services/i18n';
import validationRules from '../../services/validation-rules';
import FormValidation from '../../types/FormValidation';

export const getRoomFormValidation: FormValidation<
  { roomCode?: string }, [t: TFunction]
> = (t) => {
  return {
    roomCode: { required: validationRules.required(t) }
  };
};
