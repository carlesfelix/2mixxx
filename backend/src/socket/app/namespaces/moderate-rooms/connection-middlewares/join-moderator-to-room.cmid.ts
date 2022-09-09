import { Namespace } from 'socket.io';
import getRoomFromUser from '../../../../../core/interactors/room-moderator/getRoomFromUser';
import { buildNativeError } from '../../../helpers';

export default function joinModeratorToRoomCMid(namespace: Namespace): void {
  namespace.use((socket, next) => {
    const roomId = socket.nsp.name.replace('/moderate-rooms/', '');
    getRoomFromUser(socket.data.auth, roomId).then(() => {
      socket.data.params = { roomId };
      socket.join(roomId);
      next();
    }).catch(error => {
      next(buildNativeError(error));
    });
  });
}
