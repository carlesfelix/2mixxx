import RegisteredUserEntity from './RegisteredUserEntity';
import RoomUserEntity from './RoomUserEntity';

export type BaseUserAuth = {
  type: string;
  permissions: string[];
  user: unknown;
};
export type RoomUserAuth = {
  type: 'roomUser';
  user: RoomUserEntity;
} & BaseUserAuth;
export type RegisteredUserAuth = {
  type: 'registeredUser';
  user: RegisteredUserEntity;
} & BaseUserAuth;

type UserAuth = RoomUserAuth | RegisteredUserAuth;

export default UserAuth;
