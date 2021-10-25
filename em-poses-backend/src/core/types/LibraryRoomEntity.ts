import BaseEntity from './BaseEntity';

type LibraryRoomEntity = {
  roomId: string;
  libraryId: string;
} & BaseEntity;

export default LibraryRoomEntity;
