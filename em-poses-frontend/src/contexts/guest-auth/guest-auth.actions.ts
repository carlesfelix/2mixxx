import { isAuthenticated, register } from '../../services/guest-auth';
import { Dispatch } from './types';

export async function registerGuestUserAction(dispatch: Dispatch, room: string): Promise<void> {
  dispatch({ type: 'registerInProgress' });
  try {
    await register(room);
    dispatch({ type: 'registerSuccess', payload: { isAuthenticated: isAuthenticated() } });
  } catch (error) {
    dispatch({type: 'registerError', payload: { error } });
  }
}
