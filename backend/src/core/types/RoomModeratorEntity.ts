import BaseEntity from './BaseEntity';
import RegisteredUserEntity from './RegisteredUserEntity';
import RoomEntity from './RoomEntity';

type RoomModeratorEntity = {
  roomId?: string;
  registeredUserId?: string;
  room?: RoomEntity;
  registeredUser?: RegisteredUserEntity;
} & BaseEntity;

export default RoomModeratorEntity;
