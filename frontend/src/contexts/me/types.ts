import { ReactNode } from 'react';
import RegisteredUser from '../../types/RegisteredUser';
import RoomUser from '../../types/RoomUser';
import { AnyUserAuth } from '../../types/UserMe';

export type Action = { type: 'getMeGuestInProgress' } |
  { type: 'getMeGuestSuccess', payload: { me: RoomUser } } |
  { type: 'getMeGuestError' } |
  { type: 'getMeRegisteredInProgress' } |
  { type: 'getMeRegisteredSuccess', payload: { me: RegisteredUser } } |
  { type: 'getMeRegisteredError' };
export type Dispatch = (action: Action) => void;
export type State = {
  inProgress: boolean;
  error: boolean;
  user?: AnyUserAuth;
};

export type MeProviderProps = { children: ReactNode };
