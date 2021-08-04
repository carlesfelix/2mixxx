import { ReactNode } from 'react';
import { IGuestToken } from '../../models/IGuestToken';

export type Action = { type: 'registerInProgress' } |
  { type: 'registerSuccess', payload: { token: IGuestToken } } |
  { type: 'registerError', payload: { error: Error } };
export type Dispatch = (action: Action) => void;
export type State = {
  token?: IGuestToken,
  inProgress: boolean,
  error: Error | null;
};
export type GuestAuthProviderProps = { children: ReactNode }
