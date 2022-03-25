import classNames from 'classnames';
import { useTranslation } from '../../services/i18n';
import BasicButton from '../BasicButton';
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
      className={confirmDialogClassName}
      footer={
        <div className="confirm-dialog-footer">
          <BasicButton
            color="secondary"
            disabled={inProgress}
            onClick={rejectedHandler}
          >
            {t('Components.ConfirmDialog.cancel')}
          </BasicButton>
          <BasicButton
            color="danger"
            inProgress={inProgress}
            onClick={confirmedHandler}
          >
            {t('Components.ConfirmDialog.continue')}
          </BasicButton>
        </div>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
