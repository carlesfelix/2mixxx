import { ReactNode } from 'react';

export type Action = { type: 'createRoomUserInProgress' } |
  { type: 'createRoomUserSuccess', payload: { isAuthenticated: boolean } } |
  { type: 'createRoomUserError' } |
  { type: 'removeRoomUser' };
export type Dispatch = (action: Action) => void;
export type State = {
  isAuthenticated: boolean;
  inProgress: boolean;
  error: boolean;
};
export type RoomUserProviderProps = { children: ReactNode };
