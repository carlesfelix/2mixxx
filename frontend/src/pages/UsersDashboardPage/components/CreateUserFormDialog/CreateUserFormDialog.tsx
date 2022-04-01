import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import CreateUserForm from '../../../../types/UserForm';
import DialogState from '../../../../types/DialogState';
import { getUserFormValidation } from '../../helpers';
import './CreateUserFormDialog.scss';
import RegisteredUserRoleEnum from '../../../../enums/RegisteredUserRoleEnum';
import { getRoleOptions } from '../../../../helpers/input-options';
import { useTranslation } from '../../../../services/i18n';
import SubmitButton from '../../../../components/SubmitButton';
import InputTextField from '../../../../components/form/InputTextField';
import InputPasswordField from '../../../../components/form/InputPasswordField';

type Props = {
  state: DialogState<CreateUserForm>;
  onClose: () => void;
  onSubmit: (user: CreateUserForm) => void;
};

const defaultValues: CreateUserForm = {
  role: RegisteredUserRoleEnum.Dj
};

export default function CreateUserFormDialog(props: Props) {
  const { state, onClose, onSubmit } = props;
  const { inProgress, isOpen } = state;
  const { t } = useTranslation();
  const {
    handleSubmit, control, reset,
    getValues, trigger
  } = useForm<CreateUserForm>({ mode: 'onSubmit' });
  useEffect(() => {
    reset(defaultValues);
  }, [ isOpen, reset ]);

  const userFormValidation = getUserFormValidation({
    getValues, trigger
  });

  function submitHandler(user: CreateUserForm): void {
    onSubmit(user);
  }

  return (
    <Dialog
      isOpen={isOpen} title={t('Components.CreateUserFormDialog.title')}
      className="CreateUserFormDialog"
      closeOptions={['closeBtn']}
      onClose={onClose}
      preventClose={inProgress}
      maxWidth="35rem"
      footer={
        <div className="user-form-actions">
          <SubmitButton
            color="primary" inProgress={inProgress}
            form="userFormDialog"
          >
            {t('Components.CreateUserFormDialog.submitBtn')}
          </SubmitButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="userFormDialog">
        <InputTextField
          control={control}
          label={t('Components.CreateUserFormDialog.form.fields.email.label')}
          name="email"
          rules={userFormValidation.email}
        />
        <InputPasswordField
          control={control}
          label={t('Components.CreateUserFormDialog.form.fields.password.label')}
          name="password"
          rules={userFormValidation.password}
        />
        <InputPasswordField
          control={control}
          label={t('Components.CreateUserFormDialog.form.fields.repeatPassword.label')}
          name="repeatPassword"
          rules={userFormValidation.repeatPassword}
        />
        <ControlledInput
          field={{
            type: 'dropdown',
            props: { options: getRoleOptions(t) }
          }}
          control={control}
          defaultValue={defaultValues.role}
          label={t('Components.CreateUserFormDialog.form.fields.role.label')}
          name="role"
          rules={userFormValidation.role}
        />
      </form>
    </Dialog>
  );
}
