import { Socket } from 'socket.io';
import Ack from '../../../types/Ack';

export function addSongRequestHandler(socket: Socket) {
  return (payload: { songId: string }, ack: Ack): void => {
    const { songId } = payload;
    console.log('song added!', songId, socket.data.auth);
    ack({ data: null });
  }
}
