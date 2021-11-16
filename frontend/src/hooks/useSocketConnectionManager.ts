import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRoomUser } from '../contexts/room-user';
import { getGuestToken } from '../services/room-user-auth';

export default function useSocketConnectionManager(uri: string): Socket | undefined {
  const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
  const { state: roomUserState } = useRoomUser();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged =  !roomUserState.inProgress &&
    roomUserState.isAuthenticated;

  useEffect(() => {
    const nextSocket = io(uri, { autoConnect: false, transports: ['websocket'] })
    setSocket(nextSocket);
    if (registeredLogged) {
      getIdTokenClaims().then(idToken => {
        nextSocket.auth = {
          authorization: `Bearer ${idToken.__raw}`,
          userType: 'registeredUser'
        };
        nextSocket.connect();
      });
    } else if (guestLogged) {
      const guestToken = getGuestToken();
      nextSocket.auth = {
        authorization: `Bearer ${guestToken.__raw}`,
        userType: 'roomUser'
      };
      nextSocket.connect();
    } else {
      console.warn('Socket not connected. Auth is required');
    }
    return () => {
      nextSocket.disconnect();
    }
  }, [ registeredLogged, guestLogged, getIdTokenClaims, uri ]);
  return socket;
}
