import BaseEntity from './BaseEntity';
import RoomEntity from './RoomEntity';

type RegisteredUserEntity = Partial<{
  sub: string;
  email: string;
  role: number;
  permissions?: string[];
  rooms?: RoomEntity[];
  room?: RoomEntity;
}> & BaseEntity;

export default RegisteredUserEntity;
