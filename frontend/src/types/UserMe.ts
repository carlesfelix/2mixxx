import RegisteredUser from './RegisteredUser';
import RoomUser from './RoomUser';

export type AnyUserAuth<User extends RoomUser | RegisteredUser | unknown = any> = {
  type: string;
  user: User;
};
export type RoomUserAuth = {
  type: 'roomUser';
  user: RoomUser;
};
export type RegisteredUserAuth = {
  type: 'registeredUser';
  user: RegisteredUser;
};
