import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import CreateUserForm from '../../../../types/UserForm';
import DialogState from '../../../../types/DialogState';
import { getUserFormValidation } from '../../helpers';
import './CreateUserFormDialog.scss';
import { roleOptions } from '../../../../constants/dropdown-options';
import RegisteredUserRoleEnum from '../../../../enums/RegisteredUserRoleEnum';

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
      isOpen={isOpen} title="Create new user"
      className="CreateUserFormDialog"
      closeOptions={['closeBtn']}
      onClose={onClose}
      preventClose={inProgress}
      maxWidth="35rem"
      footer={
        <div className="user-form-actions">
          <button
            className="btn btn-primary" disabled={inProgress}
            type="submit" form="userFormDialog"
          >
            Submit
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
          rules={userFormValidation.email}
        />
        <ControlledInput
          field={{ type: 'inputText', props: { password: true } }}
          control={control}
          label="Password"
          name="password"
          rules={userFormValidation.password}
        />
        <ControlledInput
          field={{ type: 'inputText', props: { password: true } }}
          control={control}
          label="Repeat password"
          name="repeatPassword"
          rules={userFormValidation.repeatPassword}
        />
        <ControlledInput
          field={{
            type: 'dropdown',
            props: { options: roleOptions }
          }}
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
