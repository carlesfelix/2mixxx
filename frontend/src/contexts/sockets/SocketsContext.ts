import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export default createContext<{
  songRequestsSocket: Socket
} | undefined>(undefined);
