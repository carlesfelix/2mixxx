import { Link } from 'react-router-dom';
import Dialog from '../../../../components/Dialog';
import './SongRequestProgressDialog.scss';

type Props = {
  isOpen: boolean;
};
export default function SongRequestProgressDialog(props: Props) {
  const { isOpen } = props;
  return (
    <Dialog
      isOpen={isOpen}
      title="Song request sent"
      className="SongRequestProgressDialog"
      footer={
        <div className="song-request-progress-actions">
          <Link className="btn btn-primary" to="/">
            Go to pending songs
          </Link>
        </div>
      }>
        <p>Song request added successfully</p>
      </Dialog>
  );
}
