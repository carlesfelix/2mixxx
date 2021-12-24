import Song from '../../../../types/Song';
import './SongResult.scss';

type Props = {
  song: Song;
};

export default function SongResult(props: Props) {
  const { song } = props;
  const { title, artist } = song;
  return (
    <div className="SongResult">
      <div className="SongResult__info">
        <div className="card card-title song-info-title">
          <span>
            {title}
          </span>
        </div>
        {
          !!artist && (
            <div className="card card-description song-info-artist">
              <span>
                {artist}
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
}
