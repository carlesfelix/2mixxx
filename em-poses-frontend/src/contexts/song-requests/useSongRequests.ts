import { useContext } from 'react';
import SongRequestsContext from './SongRequestsContext';

export default function useSongRequests() {
  const context = useContext(SongRequestsContext);
  if (context === undefined) {
    throw new Error('useSongRequests must be used within a SongRequestsProvider');
  }
  return context;
}
