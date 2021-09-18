import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import DialogState from '../../../../types/DialogState';
import RegisteredUser from '../../../../types/RegisteredUser';
import useFormValidation from './useFormValidation';
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
  const formHook = useForm<Partial<RegisteredUser>>({ mode: 'onBlur' });
  const { handleSubmit, control, reset } = formHook;
  
  useEffect(() => {
    reset(data || defaultValues);
  }, [ isOpen, data, reset ]);

  const userFormRules = useFormValidation(control, defaultValues);
  
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
          field={{ type: 'inputText' }}
          control={control}
          label="Email"
          name="email"
          rules={userFormRules.email}
        />
        <ControlledInput
          field={{ type: 'dropdown', props: { options: [ { label: 'Admin', value: 1 }, {label: 'DJ', value: 2 } ] } }}
          control={control}
          defaultValue={defaultValues.role}
          label="Role"
          name="role"
          rules={userFormRules.role}
        />
      </form>
    </Dialog>
  );
}
