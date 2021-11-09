import { MouseEventHandler } from 'react';
import SongItem from '../../../../components/SongItem';
import SongRequest from '../../../../types/SongRequest';
import './SongRequestQueue.scss';

type Props = {
  songRequests: SongRequest[];
  onDeleteSong: (song: SongRequest) => void;
};

export default function SongRequestQueue(props: Props) {
  const { songRequests, onDeleteSong } = props;
  function deleteSongHandler(songRequest: SongRequest): MouseEventHandler<HTMLButtonElement> {
    return () => {
      onDeleteSong(songRequest);
    };
  }
  return (
    <div className="SongRequestQueue">
      {
        songRequests.map(songRequest => (
          <div className="queue-item card card-primary" key={songRequest.id}>
            <SongItem song={songRequest.song} className="queue-item__song" />
            <div className="queue-item__actions">
              <button onClick={deleteSongHandler(songRequest)}>
                Delete
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
