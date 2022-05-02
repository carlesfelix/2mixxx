import { ReactNode } from 'react';
import { AnyUserAuth, RegisteredUserAuth, RoomUserAuth } from '../../types/UserMe';

export type Action = { type: 'getMeGuestInProgress' } |
  { type: 'getMeGuestSuccess', payload: { me: RoomUserAuth } } |
  { type: 'getMeGuestError' } |
  { type: 'getMeRegisteredInProgress' } |
  { type: 'getMeRegisteredSuccess', payload: { me: RegisteredUserAuth } } |
  { type: 'getMeRegisteredError' };
export type Dispatch = (action: Action) => void;
export type State<
  User extends RoomUserAuth | RegisteredUserAuth | AnyUserAuth = AnyUserAuth
> = {
  inProgress: boolean;
  error: boolean;
  user?: User;
};

export type MeProviderProps = { children: ReactNode };
