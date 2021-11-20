import { Action, State } from './types';

export default function roomUserReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'createRoomUserInProgress':
      return {
        error: false,
        isAuthenticated: false,
        inProgress: true
      };
    case 'createRoomUserSuccess':
      return {
        error: false,
        isAuthenticated: action.payload.isAuthenticated,
        inProgress: false
      };
    case 'createRoomUserError':
      return {
        error: true,
        isAuthenticated: false,
        inProgress: false
      };
    case 'removeRoomUser':
      return {
        isAuthenticated: false,
        inProgress: false,
        error: false
      };
    default:
      return state;
  }
}
