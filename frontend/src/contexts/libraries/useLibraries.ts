import { useContext } from 'react';
import LibrariesContext from './LibrariesContext';

export default function useLibraries() {
  const context = useContext(LibrariesContext);
  if (context === undefined) {
    throw new Error('useLibraries must be used within a LibrariesProvider');
  }
  return context;
}
