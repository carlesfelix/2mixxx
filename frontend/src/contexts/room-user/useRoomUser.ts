import { useContext } from 'react';
import RoomUserContext from './RoomUserContext';

export default function useRoomUser() {
  const context = useContext(RoomUserContext);
  if (context === undefined) {
    throw new Error('useRoomUser must be used within a RoomUserProvider');
  }
  return context;
}
