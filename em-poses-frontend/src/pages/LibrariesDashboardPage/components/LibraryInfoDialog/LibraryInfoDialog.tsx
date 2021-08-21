import { ButtonHTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import Library from '../../../../types/Library';
import './LibraryInfoDialog.scss';

type Props = {
  onSubmit: (value: Library) => void;
  value?: Library;
  onClose: () => void;
  isOpen: boolean;
  submitProgress: boolean;
};
export default function LibraryInfoDialog(props: Props) {
  const { value, onSubmit, onClose, isOpen, submitProgress } = props;
  const { control, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset(value);
  }, [ isOpen, value, reset ]);
  function submitHandler(library: Library): void {
    onSubmit(library);
  }
  const actions: ButtonHTMLAttributes<HTMLButtonElement>[] = [];
  if (value) {
    actions.push({ children: 'Create' });
  } else {
    actions.push({ children: 'Save changes' });
  }
  return (
    <Dialog
      isOpen={isOpen} title={value ? 'Edit library' : 'Create new library'}
      className="LibraryInfoDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={submitProgress}
      footer={
        actions.length ? (
          <div className="library-info-actions">
            {
              actions.map((btnProps, iBtnProps) => (
                <button
                  {...btnProps} className="btn btn-primary" disabled={submitProgress}
                  key={iBtnProps} type="submit" form="libraryInfoForm"
                />
              ))
            }
          </div>
        ) : undefined
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="libraryInfoForm">
        <ControlledInput
          field={{ type: 'inputText' }}
          control={control}
          label="Title"
          name="title"
          rules={{ required: { message: 'This field is mandatory', value: true } }}
        />
      </form>
    </Dialog>
  )
}
