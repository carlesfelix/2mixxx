import RegisteredUserEntity from './RegisteredUserEntity';
import RoomUserEntity from './RoomUserEntity';

export type RoomUserAuth = {
  type: 'roomUser';
} & RoomUserEntity;
export type RegisteredUserAuth = {
  type: 'registeredUser';
} & RegisteredUserEntity;

export type AnyUserAuth = RoomUserAuth | RegisteredUserAuth;
