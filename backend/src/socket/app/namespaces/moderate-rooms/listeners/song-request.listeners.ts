import { Server, Socket } from 'socket.io';
import { deleteSongRequestHandler, getSongRequestsHandler } from '../handlers/song-request.handlers';
import { CLIENT__DELETE_SONG_REQUEST, CLIENT__GET_SONG_REQUESTS } from '../../../constants/client-actions';

export default function songRequestListeners(io: Server, socket: Socket): void {
  socket.on(CLIENT__GET_SONG_REQUESTS, getSongRequestsHandler(socket));
  socket.on(CLIENT__DELETE_SONG_REQUEST, deleteSongRequestHandler(io, socket));
}
