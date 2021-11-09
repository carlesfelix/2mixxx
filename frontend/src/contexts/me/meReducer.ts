import { Action, State } from './types';

function meReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'meRegisteredInProgress':
    case 'meGuestInProgress':
      return {
        error: null,
        inProgress: true,
        user: undefined
      };
      case 'meRegisteredError':
      case 'meGuestError':
        return {
          error: action.payload.error,
          inProgress: false,
          user: undefined
        };
    case 'meGuestSuccess':
      return {
        error: null,
        inProgress: false,
        user: {
          type: 'guest',
          ...action.payload.me
        }
      };
    case 'meRegisteredSuccess':
      return {
        error: null,
        inProgress: false,
        user: {
          type: 'registered',
          ...action.payload.me
        }
      };
    default:
      return state;
  }
}

export default meReducer;
