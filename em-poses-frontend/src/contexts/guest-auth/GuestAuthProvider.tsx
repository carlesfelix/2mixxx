import { useReducer } from 'react';
import { isAuthenticated } from '../../services/guest-auth';
import GuestAuthContext from './GuestAuthContext';
import guestAuthReducer from './guestAuthReducer';
import { GuestAuthProviderProps } from './types';

export default function GuestAuthProvider(props: GuestAuthProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(guestAuthReducer, {
    isAuthenticated: isAuthenticated(),
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
