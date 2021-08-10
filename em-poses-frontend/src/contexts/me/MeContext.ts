import { createContext } from 'react';
import { Dispatch, State } from './types';
export default createContext<{ state: State, dispatch: Dispatch } | undefined>(undefined);
