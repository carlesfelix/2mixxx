import { getMe } from '../../api/me';
import { RegisteredUserAuth, RoomUserAuth } from '../../types/UserMe';
import { Dispatch } from './types';

export async function getGuestMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeGuestInProgress' });
  try {
    const me = await getMe<RoomUserAuth>();
    dispatch({ type: 'getMeGuestSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeGuestError' });
  }
}

export function logoutGuestMeAction(dispatch: Dispatch, url: string = window.location.origin): void {
  window.location.replace(url);
}

export async function getRegisteredMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeRegisteredInProgress' });
  try {
    const me = await getMe<RegisteredUserAuth>();
    dispatch({ type: 'getMeRegisteredSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeRegisteredError' });
  }
}
