import BaseEntity from './BaseEntity';

type RoomUserEntity = {
  roomId: string;
  permissions?: string[];
} & BaseEntity;

export default RoomUserEntity;
