import { UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import { userEmailExists } from '../../api/registered-users';
import validationRules, { composeCustomRules } from '../../services/validation-rules';
import FormValidation from '../../types/FormValidation';
import OptionItem from '../../types/OptionItem';
import UserForm from '../../types/UserForm';

type GetUserOptionsProps = {
  onEdit: () => void,
  onDelete: () => void
};
export function getUserOptions(props: GetUserOptionsProps): OptionItem[] {
  const { onDelete, onEdit } = props;
  const userOptions: OptionItem[] = [
    {
      label: 'Edit role',
      onSelected: onEdit
    },
    {
      label: 'Delete',
      onSelected: onDelete
    }
  ];
  return userOptions;
}

export const getUserFormValidation: FormValidation<
  UserForm,
  {
    defaultData?: UserForm,
    getValues: UseFormGetValues<UserForm>,
    trigger: UseFormTrigger<UserForm>
  }
> = deps => {
  const { defaultData, getValues, trigger } = deps;
  return {
    email: {
      required: validationRules.required(),
      validate: composeCustomRules([
        validationRules.customRules.email(),
        async (value: string) => {
          if (defaultData?.email === value) {
            return true;
          }
          const { exists } = await userEmailExists(value);
          return !exists || 'User email exists';
        }
      ])
    },
    password: {
      required: validationRules.required(),
      validate: composeCustomRules([
        () => {
          trigger('repeatPassword');
          return true;
        },
        validationRules.customRules.strongPassword()
      ])
    },
    repeatPassword: {
      required: validationRules.required(),
      validate: (value: string) => {
        const { password } = getValues();
        return password === value || 'Password must match';
      }
    },
    role: {
      required: validationRules.required()
    }
  };
};
