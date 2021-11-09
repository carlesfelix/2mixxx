import Dialog from '../Dialog';
import './ConfirmDialog.scss';

type Props = {
  message: string;
  isOpen: boolean;
  onRejected?: () => void;
  onConfirmed?: () => void;
  inProgress?: boolean;
};
export default function ConfirmDialog(props: Props) {
  const {
    message, onRejected, onConfirmed, isOpen, inProgress = false
  } = props;
  function rejectedHandler(): void {
    onRejected && onRejected();
  }
  function confirmedHandler(): void {
    onConfirmed && onConfirmed();
  }
  return (
    <Dialog
      closeOptions={['escape', 'clickOutside']} preventClose={inProgress}
      onClose={rejectedHandler} isOpen={isOpen} title="Are you sure?"
      className="ConfirmDialog"
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
