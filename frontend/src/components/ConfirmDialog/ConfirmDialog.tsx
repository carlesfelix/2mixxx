import classNames from 'classnames';
import { useTranslation } from '../../services/i18n';
import Dialog from '../Dialog';
import './ConfirmDialog.scss';

type Props = {
  message: string;
  isOpen: boolean;
  onRejected?: () => void;
  onConfirmed?: () => void;
  inProgress?: boolean;
  className?: string;
};
export default function ConfirmDialog(props: Props) {
  const {
    message, onRejected, onConfirmed,
    isOpen, inProgress = false,
    className = ''
  } = props;
  const { t } = useTranslation();
  function rejectedHandler(): void {
    onRejected && onRejected();
  }
  function confirmedHandler(): void {
    onConfirmed && onConfirmed();
  }
  const confirmDialogClassName = classNames('ConfirmDialog', {
    [className]: !!className
  });
  return (
    <Dialog
      closeOptions={['escape', 'clickOutside']} preventClose={inProgress}
      onClose={rejectedHandler} isOpen={isOpen}
      title={t('Components.ConfirmDialog.title')}
      maxWidth="20rem" className={confirmDialogClassName}
      footer={
        <div className="confirm-dialog-footer">
          <button
            className="btn btn-secondary" type="button"
            disabled={inProgress} onClick={rejectedHandler}
          >
            {t('Components.ConfirmDialog.cancel')}
          </button>
          <button
            className="btn btn-danger" type="button"
            disabled={inProgress}  onClick={confirmedHandler}
          >
            {t('Components.ConfirmDialog.continue')}
          </button>
        </div>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
