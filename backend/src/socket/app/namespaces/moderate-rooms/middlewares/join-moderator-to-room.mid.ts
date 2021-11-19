import { Socket } from 'socket.io';

export default function joinModeratorToRoomMid(socket: Socket, next: () => void): void {
  const roomId = socket.nsp.name.replace('/moderate-rooms/', '');
  socket.data.params = { roomId };
  socket.join(roomId);
  next();
}
