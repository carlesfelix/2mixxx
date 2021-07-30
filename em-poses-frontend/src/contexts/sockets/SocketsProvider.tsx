import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import SongRequestsContext from './SocketsContext';

type Props = {
  children: ReactNode,
  songRequestsSocket: Socket
};
export default function SocketsProvider(props: Props) {
  const { children, songRequestsSocket } = props;
  const value = { songRequestsSocket };
  return (
    <SongRequestsContext.Provider value={value}>
      {children}
    </SongRequestsContext.Provider>
  );
}
