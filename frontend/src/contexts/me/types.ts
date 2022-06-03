import { ReactNode } from 'react';
import RoomUser from '../../types/RoomUser';
import User from '../../types/User';
import { AnyUserAuth } from '../../types/UserMe';

export type Action = { type: 'getMeGuestInProgress' } |
  { type: 'getMeGuestSuccess', payload: { me: AnyUserAuth<RoomUser> } } |
  { type: 'getMeGuestError' } |
  { type: 'getMeRegisteredInProgress' } |
  { type: 'getMeRegisteredSuccess', payload: { me: AnyUserAuth<RoomUser> } } |
  { type: 'getMeRegisteredError' };
export type Dispatch = (action: Action) => void;
export type State<
  U extends User = User
> = {
  inProgress: boolean;
  error: boolean;
  user?: AnyUserAuth<U>;
};

export type MeProviderProps = { children: ReactNode };
