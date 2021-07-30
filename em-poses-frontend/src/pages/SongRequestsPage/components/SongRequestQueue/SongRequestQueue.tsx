import { MouseEventHandler } from 'react';
import SongItem from '../../../../components/SongItem';
import { ITrack } from '../../../../models/ITrack';
import './SongRequestQueue.scss';

type Props = {
  songs: ITrack[];
  onDeleteSong: (song: ITrack) => void;
};

export default function SongRequestQueue(props: Props) {
  const { songs, onDeleteSong } = props;
  function deleteSongHandler(song: ITrack): MouseEventHandler<HTMLButtonElement> {
    return () => {
      onDeleteSong(song);
    };
  }
  return (
    <div className="SongRequestQueue">
      {
        songs.map(song => (
          <div className="queue-item card card-primary" key={song.id}>
            <SongItem track={song} />
            <button onClick={deleteSongHandler(song)}>
              Delete
            </button>
          </div>
        ))
      }
    </div>
  );
}
