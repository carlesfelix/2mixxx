import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { logoutGuestMeAction } from '../contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from '../contexts/room-user';
import { getGuestToken } from '../services/room-user-auth';
import usePrevious from './usePrevious';

export default function useSocketConnectionManager(uri: string): Socket {
  const previousUri = usePrevious(uri);
  const { state: roomUserState, dispatch: roomUserAuthDispatch } = useRoomUser();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged =  !roomUserState.inProgress &&
    roomUserState.isAuthenticated;

  const buildConnection = useCallback((
    uriConnection: string
  ) => {
    function onError(): void {
      removeRoomUserAction(roomUserAuthDispatch);
      logoutGuestMeAction();
    }
    const nextSocket = io(uriConnection, { autoConnect: false });
    if (registeredLogged) {
      getIdTokenClaims().then(idToken => {
        if (!idToken) {
          return Promise.reject();
        }
        nextSocket.auth = {
          authorization: `Bearer ${idToken.__raw}`,
          userType: 'registeredUser'
        };
        nextSocket.connect();
      }).catch(() => onError());
    } else if (guestLogged) {
      try {
        const guestToken = getGuestToken();
        nextSocket.auth = {
          authorization: `Bearer ${guestToken.__raw}`,
          userType: 'roomUser'
        };
        nextSocket.connect();
      } catch {
        onError();
      }
    } else {
      console.warn('Socket not connected. Auth is required');
    }
    return nextSocket;
  }, [
    registeredLogged, guestLogged, getIdTokenClaims,
    roomUserAuthDispatch
  ]);
  const [ socket, setSocket ] = useState<Socket>(() => (
    buildConnection(uri)
  ));

  useEffect(() => {
    if (previousUri !== undefined && uri !== previousUri) {
      setSocket(buildConnection(uri));
    }
  }, [ buildConnection, uri, previousUri, setSocket ]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  }, [ socket ]);
  return socket;
}
