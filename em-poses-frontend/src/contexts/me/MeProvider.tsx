import { useReducer } from 'react';
import MeContext from './MeContext';
import meReducer from './meReducer';
import { MeProviderProps } from './types';

export default function MeProvider(props: MeProviderProps) {
  const { children } = props;
  const [ state, dispatch ] = useReducer(meReducer, {
    error: null,
    inProgress: false,
    user: undefined
  });
  const value = { state, dispatch };
  return (
    <MeContext.Provider value={value}>
      {children}
    </MeContext.Provider>
  );
}