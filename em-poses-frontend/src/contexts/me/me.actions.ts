import { getGuestMe } from '../../api/guest-me';
import { getRegisteredMe } from '../../api/registered-me';
import { Dispatch } from './types';

export async function getGuestMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'meGuestInProgress' });
  try {
    const me = await getGuestMe();
    dispatch({ type: 'meGuestSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'meGuestError', payload: { error } });
  }
}

export async function getRegisteredMeAction(dispatch: Dispatch): Promise<void> {
  dispatch({ type: 'meRegisteredInProgress' });
  try {
    const me = await getRegisteredMe();
    dispatch({ type: 'meRegisteredSuccess', payload: { me } });
  } catch (error) {
    dispatch({type: 'meRegisteredError', payload: { error } });
  }
}
