import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Song from '../../types/Song';
import './SongItem.scss';

type Props = {
  song: Song;
  className?: string;
};

export default function SongItem(props: Props) {
  const { song, className = '' } = props;
  const { title, artist } = song;
  const songItemClassName = classNames('SongItem', {
    [className]: !!className
  });
  return (
    <div className={songItemClassName}>
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