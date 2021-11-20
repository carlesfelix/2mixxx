import { ReactNode } from 'react';
import GuestMe from '../../types/GuestMe';
import RegisteredMe from '../../types/RegisteredMe';
import UserMe from '../../types/UserMe';

export type Action = { type: 'getMeGuestInProgress' } |
  { type: 'getMeGuestSuccess', payload: { me: GuestMe } } |
  { type: 'getMeGuestError' } |
  { type: 'getMeRegisteredInProgress' } |
  { type: 'getMeRegisteredSuccess', payload: { me: RegisteredMe } } |
  { type: 'getMeRegisteredError' } |
  { type: 'logOutMeGuest' };
export type Dispatch = (action: Action) => void;
export type State = {
  inProgress: boolean;
  error: boolean;
  user?: UserMe;
};

export type MeProviderProps = { children: ReactNode };
