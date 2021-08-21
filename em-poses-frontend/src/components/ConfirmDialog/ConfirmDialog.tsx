import Dialog from '../Dialog';
import './ConfirmDialog.scss';

type Props<T> = {
  message: string;
  isOpen: boolean;
  onRejected?: (data?: T) => void;
  onConfirmed?: (data?: T) => void;
  data?: T;
  inProgress?: boolean;
};
export default function ConfirmDialog<T = any>(props: Props<T>) {
  const {
    message, onRejected, onConfirmed, isOpen,
    data, inProgress = false
  } = props;
  function rejectedHandler(): void {
    onRejected && onRejected(data);
  }
  function confirmedHandler(): void {
    onConfirmed && onConfirmed(data);
  }
  return (
    <Dialog
      closeOptions={['escape', 'clickOutside']} preventClose={inProgress}
      onClose={rejectedHandler} isOpen={isOpen} title="Are you sure?"
      className="ConfirmDialog"
      footer={
        <div className="confirm-dialog-footer">
          <button className="btn btn-secondary" type="button" onClick={rejectedHandler}>
            Cancel
          </button>
          <button className="btn btn-danger" type="button" onClick={confirmedHandler}>
            Continue
          </button>
        </div>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}
