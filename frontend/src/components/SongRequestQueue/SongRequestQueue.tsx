import classNames from 'classnames';
import SongRequestItem from '../SongRequestItem';
import { useTranslation } from '../../services/i18n';
import SongRequest from '../../types/SongRequest';
import './SongRequestQueue.scss';

type Props = {
  songRequests: { request: SongRequest, deleteInProgress: boolean }[];
  onDeleteSong?: (songRequest: SongRequest) => void;
  className?: string;
  canDelete?: boolean;
};

export default function SongRequestQueue(props: Props) {
  const {
    songRequests, onDeleteSong, className = '',
    canDelete
  } = props;
  const { t } = useTranslation();
  function deleteSongHandler(songRequest: SongRequest): void {
    onDeleteSong && onDeleteSong(songRequest);
  }
  const songRequestClassName = classNames('SongRequestQueue', {
    [className]: !!className
  });
  return (
    <div className={songRequestClassName}>
      {
        songRequests.length ? (
          songRequests.map((songRequest, iSongRequest) => (
            <SongRequestItem
              position={iSongRequest + 1}
              songRequest={songRequest.request}
              className="queue-item__request"
              key={songRequest.request.id}
              canDelete={canDelete}
              onDelete={deleteSongHandler}
              deleteInProgress={songRequest.deleteInProgress}
            />
          ))
        ) : (
          <div className="queue-empty">
            <p>{t('Components.SongRequestQueue.noPendingSongs')}</p>
          </div>
        )
      }
    </div>
  );
}
