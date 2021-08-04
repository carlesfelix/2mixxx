import { Action, State } from './types';

function guestAuthReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'registerInProgress':
      return {
        error: null,
        token: undefined,
        inProgress: true
      };
    case 'registerSuccess':
      return {
        error: null,
        token: action.payload.token,
        inProgress: false
      };
    case 'registerError':
      return {
        error: action.payload.error,
        token: undefined,
        inProgress: false
      };
    default:
      return state;
  }
}

export default guestAuthReducer;
