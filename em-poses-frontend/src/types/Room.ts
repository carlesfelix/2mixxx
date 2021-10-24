import BaseEntity from './BaseEntity';
import Library from './Library';

type Room = {
  code: string;
  allowSongRequests: boolean;
  libraries?: Library[];
  moderators?: any[];
} & BaseEntity;

export default Room;
