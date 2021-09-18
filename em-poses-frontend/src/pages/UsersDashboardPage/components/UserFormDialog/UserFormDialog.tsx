import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import DialogState from '../../../../types/DialogState';
import RegisteredUser from '../../../../types/RegisteredUser';
import { getUserFormValidation } from '../../helpers';
import './UserFormDialog.scss';

type Props = {
  state: DialogState<RegisteredUser>;
  onClose: () => void;
  onSubmit: (user: RegisteredUser) => void;
};

const defaultValues: Partial<RegisteredUser> = {
  role: 2
};

export default function UserFormDialog(props: Props) {
  const { state, onClose, onSubmit } = props;
  const { inProgress, isOpen, data } = state;
  const { handleSubmit, control, reset } = useForm<Partial<RegisteredUser>>({ mode: 'onSubmit' });
  
  useEffect(() => {
    reset(data || defaultValues);
  }, [ isOpen, data, reset ]);

  const userFormValidation = getUserFormValidation({ editMode: !!data });

  function submitHandler(user: RegisteredUser): void {
    onSubmit(user);
  }

  return (
    <Dialog
      isOpen={isOpen} title={data ? 'Edit user' : 'Create new user'}
      className="UserFormDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      footer={
        <div className="user-form-actions">
          <button
            className="btn btn-primary" disabled={inProgress}
            type="submit" form="userFormDialog"
          >
            {data ? 'Save changes' : 'Submit'}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="userFormDialog">
        <ControlledInput
          field={{ type: 'inputText', props: { disabled: !!data } }}
          control={control}
          label="Email"
          name="email"
          rules={userFormValidation.email}
        />
        <ControlledInput
          field={{ type: 'dropdown', props: { options: [ { label: 'Admin', value: 1 }, {label: 'DJ', value: 2 } ] } }}
          control={control}
          defaultValue={defaultValues.role}
          label="Role"
          name="role"
          rules={userFormValidation.role}
        />
      </form>
    </Dialog>
  );
}
