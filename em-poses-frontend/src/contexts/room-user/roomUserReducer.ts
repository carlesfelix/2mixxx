import { Action, State } from './types';

export default function roomUserReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'createRoomUserInProgress':
      return {
        error: null,
        isAuthenticated: false,
        inProgress: true
      };
    case 'createRoomUserSuccess':
      return {
        error: null,
        isAuthenticated: action.payload.isAuthenticated,
        inProgress: false
      };
    case 'createRoomUserError':
      return {
        error: action.payload.error,
        isAuthenticated: false,
        inProgress: false
      };
    default:
      return state;
  }
}
