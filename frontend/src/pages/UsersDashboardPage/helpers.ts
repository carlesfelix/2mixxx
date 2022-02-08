import { UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import { userEmailExists } from '../../api/registered-users';
import { TFunction } from '../../services/i18n';
import validationRules, { buildMessage, composeCustomRules } from '../../helpers/validation-rules';
import FormValidation from '../../types/FormValidation';
import OptionItem from '../../types/OptionItem';
import UserForm from '../../types/UserForm';

type GetUserOptionsProps = {
  t: TFunction,
  onEdit: () => void,
  onDelete: () => void
};
export function getUserOptions(props: GetUserOptionsProps): OptionItem[] {
  const { t, onDelete, onEdit } = props;
  const userOptions: OptionItem[] = [
    {
      label: t('Pages.UsersDashboardPage.helpers.userOptions.editRole'),
      onSelected: onEdit
    },
    {
      label: t('Pages.UsersDashboardPage.helpers.userOptions.delete'),
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
    trigger: UseFormTrigger<UserForm>
  }]
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
          return !exists ||
            buildMessage('Common.formValidationMessages.emailAlreadyInUse');
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
        return password === value ||
          buildMessage('Common.formValidationMessages.passwordMustMatch');
      }
    },
    role: {
      required: validationRules.required()
    }
  };
};
