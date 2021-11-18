import BaseEntity from './BaseEntity';
import LibraryEntity from './LibraryEntity';
import RegisteredUserEntity from './RegisteredUserEntity';

type RoomEntity = {
  code: string;
  allowSongRequests: boolean;
  libraries?: LibraryEntity[];
  moderators?: RegisteredUserEntity[];
} & BaseEntity;

export default RoomEntity;
