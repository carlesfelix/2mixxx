import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMe } from '../contexts/me';
import { logoutGuestMeAction } from '../contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from '../contexts/room-user';
import { getGuestToken } from '../services/room-user-auth';

export default function useSocketConnectionManager(uri: string): Socket | undefined {
  const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
  const { state: roomUserState, dispatch: roomUserAuthDispatch } = useRoomUser();
  const { dispatch: meDispatch } = useMe();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged =  !roomUserState.inProgress &&
    roomUserState.isAuthenticated;

  useEffect(() => {
    const nextSocket = io(uri, { autoConnect: false });
    function onError(): void {
      removeRoomUserAction(roomUserAuthDispatch);
      logoutGuestMeAction(meDispatch);
    }
    setSocket(nextSocket);
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
    return () => {
      nextSocket.disconnect();
    }
  }, [
    registeredLogged, guestLogged, getIdTokenClaims,
    uri, roomUserAuthDispatch, meDispatch
  ]);
  return socket;
}
