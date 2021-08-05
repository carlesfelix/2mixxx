import { ReactNode } from 'react';
import GuestToken from '../../types/GuestToken';

export type Action = { type: 'registerInProgress' } |
  { type: 'registerSuccess', payload: { token: GuestToken } } |
  { type: 'registerError', payload: { error: Error } };
export type Dispatch = (action: Action) => void;
export type State = {
  token?: GuestToken,
  inProgress: boolean,
  error: Error | null;
};
export type GuestAuthProviderProps = { children: ReactNode }
