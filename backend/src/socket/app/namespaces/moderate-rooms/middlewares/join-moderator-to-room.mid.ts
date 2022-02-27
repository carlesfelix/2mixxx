import { Socket } from 'socket.io';
import getRoomFromUser from '../../../../../core/interactors/room-moderator/getRoomFromUser';
import { buildNativeError } from '../../../helpers';

export default function joinModeratorToRoomMid(socket: Socket, next: (err?: Error) => void): void {
  const roomId = socket.nsp.name.replace('/moderate-rooms/', '');
  getRoomFromUser(socket.data.auth, roomId).then(() => {
    socket.data.params = { roomId };
    socket.join(roomId);
    next();
  }).catch(error => {
    next(buildNativeError(error));
  });
}
