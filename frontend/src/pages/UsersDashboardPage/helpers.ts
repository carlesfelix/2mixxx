import { UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import { userEmailExists } from '../../api/registered-users';
import { TFunction } from '../../services/i18n';
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
  [deps: {
    defaultData?: UserForm,
    getValues: UseFormGetValues<UserForm>,
    trigger: UseFormTrigger<UserForm>,
    t: TFunction
  }]
> = deps => {
  const { t, defaultData, getValues, trigger } = deps;
  return {
    email: {
      required: validationRules.required(t),
      validate: composeCustomRules([
        validationRules.customRules.email(t),
        async (value: string) => {
          if (defaultData?.email === value) {
            return true;
          }
          const { exists } = await userEmailExists(value);
          return !exists ||
            t('Common.formValidationMessages.emailAlreadyInUse') as string;
        }
      ])
    },
    password: {
      required: validationRules.required(t),
      validate: composeCustomRules([
        () => {
          trigger('repeatPassword');
          return true;
        },
        validationRules.customRules.strongPassword(t)
      ])
    },
    repeatPassword: {
      required: validationRules.required(t),
      validate: (value: string) => {
        const { password } = getValues();
        return password === value ||
          t('Common.formValidationMessages.passwordMustMatch') as string;
      }
    },
    role: {
      required: validationRules.required(t)
    }
  };
};
