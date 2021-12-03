import { useReducer } from 'react';
import { isAuthenticated } from '../../services/room-user-auth';
import RoomUserContext from './RoomUserContext';
import roomUserReducer from './roomUserReducer';
import { RoomUserProviderProps } from './types';

export default function RoomUserProvider(props: RoomUserProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(roomUserReducer, {
    isAuthenticated: isAuthenticated(),
    inProgress: false,
    error: false
  });
  const value = { state, dispatch };
  return (
    <RoomUserContext.Provider value={value}>
      {children}
    </RoomUserContext.Provider>
  );
}
