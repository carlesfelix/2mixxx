import BaseEntity from './BaseEntity';
import RoomEntity from './RoomEntity';
import RoomUserEntity from './RoomUserEntity';
import SongEntity from './SongEntity';

type SongRequestEntity = {
  roomUserId?: string;
  songId?: string;
  roomId?: string;
  room?: RoomEntity;
  song?: SongEntity;
  user?: RoomUserEntity;
} & BaseEntity;

export default SongRequestEntity;
