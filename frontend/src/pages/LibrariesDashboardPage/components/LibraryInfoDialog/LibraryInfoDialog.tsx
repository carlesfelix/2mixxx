import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../../../components/Dialog';
import InputTextField from '../../../../components/form/InputTextField';
import SubmitButton from '../../../../components/SubmitButton';
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
  const { control, handleSubmit, reset } = useForm<Library>();
  const { t } = useTranslation();
  const libraryInfoFormValidation = getLibraryInfoFormValidation();
  useEffect(() => {
    reset(data || {});
  }, [ isOpen, data, reset ]);
  function submitHandler(library: Library): void {
    onSubmit(library);
  }
  const submitButtonLabel = data ? (
    t('Components.LibraryInfoDialog.saveChangesAction')
  ) : (
    t('Components.LibraryInfoDialog.createAction')
  );
  const dialogTitle = data ? (
    t('Components.LibraryInfoDialog.editLibrary')
  ) : (
    t('Components.LibraryInfoDialog.createNewLibrary')
  );
  return (
    <Dialog
      isOpen={isOpen}
      title={dialogTitle}
      className="LibraryInfoDialog" closeOptions={['closeBtn']} onClose={onClose}
      preventClose={inProgress}
      maxWidth="20rem"
      footer={
        <div className="library-info-actions">
          <SubmitButton
            color="primary"
            inProgress={inProgress}
            form="libraryInfoForm"
          >
            {submitButtonLabel}
          </SubmitButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit(submitHandler)} id="libraryInfoForm">
        <InputTextField
          control={control}
          label={t('Components.LibraryInfoDialog.form.fields.title.label')}
          name="title"
          rules={libraryInfoFormValidation.title}
        />
      </form>
    </Dialog>
  );
}
