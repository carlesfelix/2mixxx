import BaseEntity from './BaseEntity';
import LibraryEntity from './LibraryEntity';

type RoomEntity = {
  code: string;
  allowSongRequests: boolean;
  libraries?: LibraryEntity[];
} & BaseEntity;

export default RoomEntity;
