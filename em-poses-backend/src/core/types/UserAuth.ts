import RegisteredUserEntity from './RegisteredUserEntity';
import RoomUserEntity from './RoomUserEntity';

export type RoomUserAuth = {
  type: 'roomUser',
  user: RoomUserEntity
};
export type RegisteredUserAuth = {
  type: 'registeredUser',
  user: RegisteredUserEntity
};

type UserAuth = RoomUserAuth | RegisteredUserAuth | undefined;

export default UserAuth;
