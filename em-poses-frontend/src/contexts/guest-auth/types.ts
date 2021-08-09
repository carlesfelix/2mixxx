import { ReactNode } from 'react';

export type Action = { type: 'registerInProgress' } |
  { type: 'registerSuccess', payload: { isAuthenticated: boolean } } |
  { type: 'registerError', payload: { error: Error } };
export type Dispatch = (action: Action) => void;
export type State = {
  isAuthenticated: boolean;
  inProgress: boolean;
  error: Error | null;
};
export type GuestAuthProviderProps = { children: ReactNode }
