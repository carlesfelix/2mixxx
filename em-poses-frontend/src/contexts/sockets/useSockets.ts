import { useContext } from 'react';
import SongRequestsContext from './SocketsContext';

export default function useSockets() {
  const context = useContext(SongRequestsContext);
  if (context === undefined) {
    throw new Error('useSockets must be used within a SocketsProvider');
  }
  return context;
}
