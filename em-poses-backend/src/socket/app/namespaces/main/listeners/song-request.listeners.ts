import { Socket } from 'socket.io';
import { addSongRequestHandler } from '../handlers/song-request.handlers';
import {
  CLIENT__ADD_SONG_REQUEST
} from '../constants/client-actions';

export default function songRequestListeners(socket: Socket): void {
  socket.on(CLIENT__ADD_SONG_REQUEST, addSongRequestHandler(socket));
}
