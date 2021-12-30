import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
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
    defaultData: data, getValues, trigger, t
  });

  function submitHandler(records: { role: number }): void {
    if (state.data) {
      onSubmit(state.data, records.role);
    }
  }

  return (
    <Dialog
      isOpen={isOpen} title="Edit role"
      className="EditUserRoleFormDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      maxWidth="20rem"
      footer={
        <div className="user-form-actions">
          <button
            className="btn btn-primary" disabled={inProgress}
            type="submit" form="userFormDialog"
          >
            Save changes
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="userFormDialog">
        <ControlledInput
          field={{
            type: 'dropdown',
            props: { options: getRoleOptions(key => key) }
          }}
          control={control}
          defaultValue={RegisteredUserRoleEnum.Dj}
          label="Role"
          name="role"
          rules={userFormValidation.role}
        />
      </form>
    </Dialog>
  );
}
