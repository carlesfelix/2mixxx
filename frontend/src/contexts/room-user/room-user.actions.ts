import { isAuthenticated, register, unregister } from '../../services/room-user-auth';
import { Dispatch } from './types';

export async function createRoomUserAction(dispatch: Dispatch, room: string): Promise<void> {
  dispatch({ type: 'createRoomUserInProgress' });
  try {
    await register(room);
    dispatch({
      type: 'createRoomUserSuccess',
      payload: { isAuthenticated: isAuthenticated() }
    });
  } catch {
    dispatch({ type: 'createRoomUserError' });
  }
}

export function removeRoomUserAction(dispatch: Dispatch): void {
  unregister();
  dispatch({ type: 'removeRoomUser' });
}
