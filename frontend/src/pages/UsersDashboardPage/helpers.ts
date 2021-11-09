import { userEmailExists } from '../../api/registered-users';
import validationRules from '../../services/validation-rules';
import OptionItem from '../../types/OptionItem';
import RegisteredUser from '../../types/RegisteredUser';
import FormValidation from '../../types/FormValidation';

type GetUserOptionsProps = {
  onEdit: () => void,
  onDelete: () => void
};
export function getUserOptions(props: GetUserOptionsProps): OptionItem[] {
  const { onDelete, onEdit } = props;
  const userOptions: OptionItem[] = [
    {
      label: 'Edit',
      onSelected: onEdit
    },
    {
      label: 'Delete',
      onSelected: onDelete
    }
  ];
  return userOptions;
}

export const getUserFormValidation: FormValidation<Partial<RegisteredUser>, { editMode: boolean }> = (deps) => {
  const { editMode } = deps;
  return {
    email: {
      required: validationRules.required(),
      pattern: validationRules.patterns.email(),
      validate: async (value: string) => {
        if (editMode) {
          return true;
        }
        const { exists } = await userEmailExists(value);
        return !exists || 'User email exists';
      }
    },
    role: {
      required: validationRules.required()
    }
  };
};