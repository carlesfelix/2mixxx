import { ButtonHTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import ControlledInput from '../../../../components/forms/ControlledInput';
import { useTranslation } from '../../../../services/i18n';
import DialogState from '../../../../types/DialogState';
import Library from '../../../../types/Library';
import { getLibraryInfoFormValidation } from '../../helpers';
import './LibraryInfoDialog.scss';

type Props = {
  onSubmit: (value: Library) => void;
  onClose: () => void;
  state: DialogState<Library | undefined>
};
export default function LibraryInfoDialog(props: Props) {
  const { state, onSubmit, onClose } = props;
  const { inProgress, data, isOpen } = state;
  const { control, handleSubmit, reset } = useForm();
  const { t } = useTranslation();
  const libraryInfoFormValidation = getLibraryInfoFormValidation();
  useEffect(() => {
    reset(data || {});
  }, [ isOpen, data, reset ]);
  function submitHandler(library: Library): void {
    onSubmit(library);
  }
  const actions: ButtonHTMLAttributes<HTMLButtonElement>[] = [];
  if (data) {
    actions.push({ children: t('Components.LibraryInfoDialog.saveChangesAction') });
  } else {
    actions.push({ children: t('Components.LibraryInfoDialog.createAction') });
  }
  return (
    <Dialog
      isOpen={isOpen}
      title={data ? t('Components.LibraryInfoDialog.editLibrary') : t('Components.LibraryInfoDialog.createNewLibrary')}
      className="LibraryInfoDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      maxWidth="20rem"
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
          label={t('Components.LibraryInfoDialog.form.fields.title.label')}
          name="title"
          rules={libraryInfoFormValidation.title}
        />
      </form>
    </Dialog>
  );
}
