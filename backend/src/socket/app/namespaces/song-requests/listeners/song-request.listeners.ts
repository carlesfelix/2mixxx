import { Socket, Server } from 'socket.io';
import {
  addSongRequestHandler,
  getSongRequestsHandler
} from '../handlers/song-request.handlers';
import {
  CLIENT__ADD_SONG_REQUEST, CLIENT__GET_SONG_REQUESTS
} from '../../../constants/client-actions';

export default function songRequestListeners(io: Server, socket: Socket): void {
  socket.on(CLIENT__ADD_SONG_REQUEST, addSongRequestHandler(io, socket));
  socket.on(CLIENT__GET_SONG_REQUESTS, getSongRequestsHandler(socket));
}
