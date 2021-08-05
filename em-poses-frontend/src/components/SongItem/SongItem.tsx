import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Song from '../../types/Song';
import './SongItem.scss';

type Props = {
  track: Song;
};

export default function SongItem(props: Props) {
  const { track } = props;
  const { name, artist } = track;
  return (
    <div className="SongItem">
      <div className="thumbnail-container">
        <FontAwesomeIcon icon={faCompactDisc} />
      </div>
      <div className="info-container">
        <div className="song-name">
          <span>{name}</span>
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