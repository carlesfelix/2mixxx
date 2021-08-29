import { useReducer } from 'react';
import GlobalProgressContext from './GlobalProgressContext';
import globalProgressReducer from './globalProgressReducer';
import { GlobalProgressProviderProps } from './types';

export default function GlobalProgressProvider(props: GlobalProgressProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(globalProgressReducer, {});
  const value = { state, dispatch };
  return (
    <GlobalProgressContext.Provider value={value}>
      {children}
    </GlobalProgressContext.Provider>
  );
}
