import { ReactNode } from 'react';

export type Action = { type: 'createRoomUserInProgress' } |
  { type: 'createRoomUserSuccess', payload: { isAuthenticated: boolean } } |
  { type: 'createRoomUserError', payload: { error: Error } };
export type Dispatch = (action: Action) => void;
export type State = {
  isAuthenticated: boolean;
  inProgress: boolean;
  error: Error | null;
};
export type RoomUserProviderProps = { children: ReactNode };
