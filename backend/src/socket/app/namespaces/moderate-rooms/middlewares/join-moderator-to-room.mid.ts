import { Socket } from 'socket.io';
import getMyRoomInteractor from '../../../../../core/interactors/registered-users/getMyRoom';

export default function joinModeratorToRoomMid(socket: Socket, next: (err?: Error) => void): void {
  const roomId = socket.nsp.name.replace('/moderate-rooms/', '');
  getMyRoomInteractor(socket.data.auth, roomId).then(() => {
    socket.data.params = { roomId };
    socket.join(roomId);
    next();
  }).catch(err => {
    next(err)
  });
}
