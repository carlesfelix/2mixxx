import { Action, State } from './types';

function meReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'getMeRegisteredInProgress':
    case 'getMeGuestInProgress':
      return {
        error: false,
        inProgress: true,
        user: undefined
      };
      case 'getMeRegisteredError':
      case 'getMeGuestError':
        return {
          error: true,
          inProgress: false,
          user: undefined
        };
    case 'getMeGuestSuccess':
      return {
        error: false,
        inProgress: false,
        user: {
          type: 'roomUser',
          user: action.payload.me.user
        }
      };
    case 'getMeRegisteredSuccess':
      return {
        error: false,
        inProgress: false,
        user: {
          type: 'registeredUser',
          user: action.payload.me.user
        }
      };
    default:
      return state;
  }
}

export default meReducer;
