import { registerGuestUser } from '../../api/guest-users';
import { Dispatch } from './types';

export async function registerGuestUserAction(dispatch: Dispatch, room: string): Promise<void> {
  dispatch({ type: 'registerInProgress' });
  try {
    const token = await registerGuestUser(room);
    dispatch({ type: 'registerSuccess', payload: { token } });
  } catch (error) {
    dispatch({type: 'registerError', payload: { error } });
  }
}
