import classNames from 'classnames';
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
      onClose={rejectedHandler} isOpen={isOpen} title="Are you sure?"
      className={confirmDialogClassName}
      footer={
        <div className="confirm-dialog-footer">
          <button
            className="btn btn-secondary" type="button"
            disabled={inProgress} onClick={rejectedHandler}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger" type="button"
            disabled={inProgress}  onClick={confirmedHandler}
          >
            Continue
          </button>
        </div>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
