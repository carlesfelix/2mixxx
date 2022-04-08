import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import SubmitButton from '../../../../components/SubmitButton';
import RegisteredUserRoleEnum from '../../../../enums/RegisteredUserRoleEnum';
import { getRoleOptions } from '../../../../helpers/input-options';
import { useTranslation } from '../../../../services/i18n';
import DialogState from '../../../../types/DialogState';
import RegisteredUser from '../../../../types/RegisteredUser';
import UserForm from '../../../../types/UserForm';
import { getUserFormValidation } from '../../helpers';
import './EditUserRoleFormDialog.scss';

type Props = {
  state: DialogState<RegisteredUser>;
  onClose: () => void;
  onSubmit: (user: RegisteredUser, updatedRole: number) => void;
};

export default function EditUserRoleFormDialog(props: Props) {
  const { state, onClose, onSubmit } = props;
  const { inProgress, isOpen, data } = state;
  const { t } = useTranslation();
  const {
    handleSubmit, control, reset,
    getValues, trigger
  } = useForm<UserForm>({ mode: 'onSubmit' });
  useEffect(() => {
    reset(data);
  }, [ isOpen, data, reset ]);

  const userFormValidation = getUserFormValidation({
    defaultData: data, getValues, trigger
  });

  function submitHandler(records: UserForm): void {
    if (state.data) {
      onSubmit(state.data, records.role!);
    }
  }

  return (
    <Dialog
      isOpen={isOpen} title={t('Components.EditUserRoleFormDialog.title')}
      className="EditUserRoleFormDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      maxWidth="20rem"
      footer={
        <div className="user-form-actions">
          <SubmitButton
            color="primary" inProgress={inProgress}
            form="userFormDialog"
          >
            {t('Components.EditUserRoleFormDialog.submitBtn')}
          </SubmitButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="userFormDialog">
        <ControlledInput
          field={{
            type: 'dropdown',
            props: { options: getRoleOptions(t) }
          }}
          control={control}
          defaultValue={RegisteredUserRoleEnum.Dj}
          label={t('Components.EditUserRoleFormDialog.form.fields.role.label')}
          name="role"
          rules={userFormValidation.role}
        />
      </form>
    </Dialog>
  );
}
