import BaseEntity from './BaseEntity';

type Room = {
  code: string;
  allowSongRequests: boolean;
} & BaseEntity;

export default Room;
