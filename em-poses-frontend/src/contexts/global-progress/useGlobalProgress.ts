import { useContext } from 'react';
import GlobalProgressContext from './GlobalProgressContext';

export default function useGlobalProgress() {
  const context = useContext(GlobalProgressContext);
  if (context === undefined) {
    throw new Error('useGlobalProgress must be used within a GlobalProgressProvider');
  }
  return context;
}
