import { ButtonHTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import DialogState from '../../../../types/DialogState';
import Library from '../../../../types/Library';
import './LibraryInfoDialog.scss';

type Props = {
  onCreate: (value: Library) => void;
  onEdit: (value: Library) => void;
  onClose: () => void;
  state: DialogState<Library>
};
export default function LibraryInfoDialog(props: Props) {
  const { state, onCreate, onEdit, onClose } = props;
  const { inProgress, data, isOpen } = state;
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(data || {});
  }, [ isOpen, data, reset ]);
  function submitHandler(library: Library): void {
    data ? onEdit(library) : onCreate(library);
  }
  const actions: ButtonHTMLAttributes<HTMLButtonElement>[] = [];
  if (data) {
    actions.push({ children: 'Save changes' });
  } else {
    actions.push({ children: 'Create' });
  }
  return (
    <Dialog
      isOpen={isOpen} title={data ? 'Edit library' : 'Create new library'}
      className="LibraryInfoDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      footer={
        actions.length ? (
          <div className="library-info-actions">
            {
              actions.map((btnProps, iBtnProps) => (
                <button
                  {...btnProps} className="btn btn-primary" disabled={inProgress}
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
  );
}
