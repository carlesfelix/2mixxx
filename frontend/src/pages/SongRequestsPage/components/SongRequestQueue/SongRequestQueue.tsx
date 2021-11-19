import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import AsyncLayout from '../../../../components/AsyncLayout';
import SongItem from '../../../../components/SongItem';
import AsyncState from '../../../../types/AsyncState';
import SongRequest from '../../../../types/SongRequest';
import './SongRequestQueue.scss';

type Props = {
  songRequests: AsyncState<SongRequest[]>;
  onDeleteSong?: (song: SongRequest) => void;
  className?: string;
  canDelete?: boolean;
};

export default function SongRequestQueue(props: Props) {
  const {
    songRequests, onDeleteSong, className = '',
    canDelete
  } = props;
  function deleteSongHandler(songRequest: SongRequest): MouseEventHandler<HTMLButtonElement> {
    return () => {
      onDeleteSong && onDeleteSong(songRequest);
    };
  }
  const songRequestClassName = classNames('SongRequestQueue', {
    [className]: !!className
  });
  return (
    <div className={songRequestClassName}>
      <AsyncLayout
        inProgress={songRequests.inProgress}
        error={songRequests.error}
        errorMessage="Unable to retrieve pending songs"
      >
        {
          songRequests.data.length ? (
            songRequests.data.map(songRequest => (
              <div className="queue-item card card-primary" key={songRequest.id}>
                <SongItem song={songRequest.song} className="queue-item__song" />
                {
                  canDelete && (
                    <div className="queue-item__actions">
                      <button className="btn btn-warn btn-round" onClick={deleteSongHandler(songRequest)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )
                }
              </div>
            ))
          ) : (
            <div className="queue-empty">
              <span>There are no pending songs</span>
            </div>
          )
        }
      </AsyncLayout>
    </div>
  );
}
