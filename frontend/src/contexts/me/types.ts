import { ReactNode } from 'react';
import GuestMe from '../../types/GuestMe';
import RegisteredMe from '../../types/RegisteredMe';

export type Action = { type: 'meGuestInProgress' } |
  { type: 'meGuestSuccess', payload: { me: GuestMe } } |
  { type: 'meGuestError', payload: { error: Error } } |
  { type: 'meRegisteredInProgress' } |
  { type: 'meRegisteredSuccess', payload: { me: RegisteredMe } } |
  { type: 'meRegisteredError', payload: { error: Error } };
export type Dispatch = (action: Action) => void;
export type State = {
  inProgress: boolean;
  error: Error | null;
  user: { type: 'guest' } & GuestMe |
    { type: 'registered' } & RegisteredMe |
    undefined;
};

export type MeProviderProps = { children: ReactNode };
