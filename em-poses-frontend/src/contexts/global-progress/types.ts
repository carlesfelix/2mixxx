import { ReactNode } from 'react';

export type Action = { type: 'updateProgress', payload: { progressId: string, progress: number } } |
  { type: 'deleteProgress', payload: { progressId: string } };
export type Dispatch = (action: Action) => void;
export type State = {
  [id: string]: number;
};
export type GlobalProgressProviderProps = { children: ReactNode }
