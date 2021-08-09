import { Action, State } from './types';

function guestAuthReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'registerInProgress':
      return {
        error: null,
        isAuthenticated: false,
        inProgress: true
      };
    case 'registerSuccess':
      return {
        error: null,
        isAuthenticated: action.payload.isAuthenticated,
        inProgress: false
      };
    case 'registerError':
      return {
        error: action.payload.error,
        isAuthenticated: false,
        inProgress: false
      };
    default:
      return state;
  }
}

export default guestAuthReducer;
