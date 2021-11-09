import { Socket } from 'socket.io';
import UserAuth from '../../../core/types/UserAuth';

export default function joinRoomUsersMid(socket: Socket, next: () => void): void {
  const auth: UserAuth | undefined = socket.data.auth;
  if (auth && auth.type === 'roomUser') {
    socket.join(auth.user.roomId);
  }
  next();
}
