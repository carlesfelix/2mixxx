import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLibrary, updateLibraryById } from '../../../../api/libraries';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import Library from '../../../../types/Library';
import './LibraryInfoDialog.scss';

type Props = {
  onCreate: (value: Library) => void;
  onEdit: (value: Library) => void;
  value?: Library;
  onClose: () => void;
  isOpen: boolean;
};
export default function LibraryInfoDialog(props: Props) {
  const { value, onCreate, onEdit, onClose, isOpen } = props;
  const { control, handleSubmit, reset } = useForm();
  const [ submitProgress, setSubmitProgress ] = useState<boolean>(false);
  useEffect(() => {
    reset(value || {});
  }, [ isOpen, value, reset ]);
  function submitHandler(library: Library): void {
    if (value){
      setSubmitProgress(true);
      updateLibraryById(value.id!, library).then(() => {
        setSubmitProgress(false);
        onEdit(library);
      }).catch(() => {
        setSubmitProgress(false);
      });
    } else {
      setSubmitProgress(true);
      createLibrary(library).then(data => {
        setSubmitProgress(false);
        onCreate(data);
      }).catch(() => {
        setSubmitProgress(false);
      });
    }
  }
  const actions: ButtonHTMLAttributes<HTMLButtonElement>[] = [];
  if (value) {
    actions.push({ children: 'Save changes' });
  } else {
    actions.push({ children: 'Create' });
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
  );
}
