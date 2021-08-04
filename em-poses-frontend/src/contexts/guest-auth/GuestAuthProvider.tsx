import { useReducer } from 'react';
import GuestAuthContext from './GuestAuthContext';
import guestAuthReducer from './guestAuthReducer';
import { GuestAuthProviderProps } from './types';

export default function SocketsProvider(props: GuestAuthProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(guestAuthReducer, {
    token: undefined,
    inProgress: false,
    error: null
  });
  const value = { state, dispatch };
  return (
    <GuestAuthContext.Provider value={value}>
      {children}
    </GuestAuthContext.Provider>
  );
}
