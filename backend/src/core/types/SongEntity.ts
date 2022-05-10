import BaseEntity from './BaseEntity';

type SongEntity = {
  title: string;
  artist?: string;
  libraryId?: string;
} & BaseEntity;

export default SongEntity;
