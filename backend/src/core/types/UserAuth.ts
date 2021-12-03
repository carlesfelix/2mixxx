import RegisteredUserEntity from './RegisteredUserEntity';
import RoomUserEntity from './RoomUserEntity';

export type AnyUserAuth = {
  type: string;
  user: RoomUserEntity | RegisteredUserEntity;
};
export type RoomUserAuth = {
  type: 'roomUser';
  user: RoomUserEntity;
};
export type RegisteredUserAuth = {
  type: 'registeredUser';
  user: RegisteredUserEntity;
};
