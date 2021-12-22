import { faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import SongRequest from '../../types/SongRequest';
import Label from '../Label';
import './SongRequestItem.scss';

type Props = {
  songRequest: SongRequest;
  className?: string;
  canDelete?: boolean;
  position: number;
  onDelete?: (songRequest: SongRequest) => void;
  deleteInProgress?: boolean
};

export default function SongRequestItem(props: Props) {
  const {
    songRequest, className = '',
    canDelete, deleteInProgress,
    onDelete, position
  } = props;
  const { song } = songRequest;
  const { title, artist } = song;
  function deleteHandler(): void {
    onDelete && onDelete(songRequest);
  }
  const songItemClassName = classNames('SongRequestItem', {
    [className]: !!className
  });
  return (
    <Label
      className={songItemClassName}
      header={
        <div className="thumbnail-container">
          <span className="queue-position">
            {position}
          </span>
        </div>
      }
    >
      <div className="request-container">
        <div className="request-info">
          <div className="song-name">
            <span>{title}</span>
          </div>
          {
            !!artist && (
              <div className="song-artist">
                <span>{artist}</span>
              </div>
            )
          }
        </div>
        {
          canDelete && (
            <div className="song-request-actions">
              {
                deleteInProgress ? (
                  <div className="delete-progress-container">
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  </div>
                ) : (
                  <button
                    className="btn btn-icon btn-icon-danger"
                    onClick={deleteHandler}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )
              }
              
            </div>
          )
        }
      </div>
    </Label>
  );
}