import { useContext } from 'react';
import GuestAuthContext from './GuestAuthContext';

export default function useGuestAuth() {
  const context = useContext(GuestAuthContext);
  if (context === undefined) {
    throw new Error('useGuestAuth must be used within a GuestAuthProvider');
  }
  return context;
}
