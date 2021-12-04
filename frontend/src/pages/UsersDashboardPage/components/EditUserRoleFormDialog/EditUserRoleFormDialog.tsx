import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
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
      footer={
        <div className="user-form-actions">
          <button
            className="btn btn-primary" disabled={inProgress}
            type="submit" form="userFormDialog"
          >
            Update user
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="userFormDialog">
        <ControlledInput
          field={{ type: 'dropdown', props: { options: [ { label: 'Admin', value: 1 }, {label: 'DJ', value: 2 } ] } }}
          control={control}
          defaultValue={2}
          label="Role"
          name="role"
          rules={userFormValidation.role}
        />
      </form>
    </Dialog>
  );
}