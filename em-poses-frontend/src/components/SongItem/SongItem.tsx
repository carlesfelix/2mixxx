import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Song from '../../types/Song';
import './SongItem.scss';

type Props = {
  song: Song;
};

export default function SongItem(props: Props) {
  const { song } = props;
  const { title, artist } = song;
  return (
    <div className="SongItem">
      <div className="thumbnail-container">
        <FontAwesomeIcon icon={faCompactDisc} />
      </div>
      <div className="info-container">
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
    </div>
  );
}