import { MouseEventHandler } from 'react';
import SongItem from '../../../../components/SongItem';
import Song from '../../../../types/Song';
import './SongRequestQueue.scss';

type Props = {
  songs: Song[];
  onDeleteSong: (song: Song) => void;
};

export default function SongRequestQueue(props: Props) {
  const { songs, onDeleteSong } = props;
  function deleteSongHandler(song: Song): MouseEventHandler<HTMLButtonElement> {
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
