import BaseEntity from './BaseEntity';
import Song from './Song';

type SongRequest = {
  song: Song
} & BaseEntity;

export default SongRequest;
