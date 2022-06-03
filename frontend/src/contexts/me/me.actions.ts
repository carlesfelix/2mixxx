import { getMe } from '../../api/me';
import RegisteredUser from '../../types/RegisteredUser';
import RoomUser from '../../types/RoomUser';
import { Dispatch } from './types';

export async function getGuestMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeGuestInProgress' });
  try {
    const me = await getMe<RoomUser>();
    dispatch({ type: 'getMeGuestSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeGuestError' });
  }
}

export function logoutGuestMeAction(url: string = window.location.origin): void {
  window.location.replace(url);
}

export async function getRegisteredMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'getMeRegisteredInProgress' });
  try {
    const me = await getMe<RegisteredUser>();
    dispatch({ type: 'getMeRegisteredSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'getMeRegisteredError' });
  }
}
