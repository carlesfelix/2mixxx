import SongItem from '../../../../components/SongItem';
import { ITrack } from '../../../../models/ITrack';
import './SongRequestQueue.scss';

type Props = {
  songList: ITrack[]
};

export default function SongRequestQueue(props: Props) {
  const { songList } = props;
  return (
    <div className="SongRequestQueue">
      {
        songList.map(song => (
          <div className="queue-item" key={song.id}>
            <SongItem track={song} />
          </div>
        ))
      }
    </div>
  );
}
