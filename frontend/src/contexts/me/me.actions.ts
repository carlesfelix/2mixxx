import { getGuestMe } from '../../api/guest-me';
import { getRegisteredMe } from '../../api/registered-me';
import { Dispatch } from './types';

export async function getGuestMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeGuestInProgress' });
  try {
    const me = await getGuestMe();
    dispatch({ type: 'getMeGuestSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeGuestError' });
  }
}

export function logoutGuestMeAction(dispatch: Dispatch): void {
  dispatch({ type: 'logOutMeGuest' });
}

export async function getRegisteredMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeRegisteredInProgress' });
  try {
    const me = await getRegisteredMe();
    dispatch({ type: 'getMeRegisteredSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeRegisteredError' });
  }
}
