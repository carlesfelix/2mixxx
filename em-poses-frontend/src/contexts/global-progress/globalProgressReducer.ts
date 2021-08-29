import { Action, State } from './types';

export default function globalProgressReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'updateProgress':
      return {
        ...state,
        [action.payload.progressId]: action.payload.progress
      };
    case 'deleteProgress':
      const { [action.payload.progressId]: _, ...newState } = state;
      return newState;
    default:
      return state;
  }
}
