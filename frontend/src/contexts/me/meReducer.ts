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
          type: 'guest',
          ...action.payload.me
        }
      };
    case 'getMeRegisteredSuccess':
      return {
        error: false,
        inProgress: false,
        user: {
          type: 'registered',
          ...action.payload.me
        }
      };
    case 'logOutMeGuest':
      return {
        error: false,
        inProgress: false
      };
    default:
      return state;
  }
}

export default meReducer;
