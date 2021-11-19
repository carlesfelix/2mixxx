import { Namespace, Server } from 'socket.io';
import songRequestListeners from './listeners/song-request.listeners';
import joinModeratorToRoomMid from './middlewares/join-moderator-to-room.mid';

function ModerateRoomsNsp(io: Server): Namespace {
  const moderateRoomNamespace = io.of(/^\/moderate-rooms\/[0-9a-z-]{36}$/);
  // moderateRoomNamespace.use(authMid);
  moderateRoomNamespace.use(joinModeratorToRoomMid);
  moderateRoomNamespace.on('connection', socket => {
    songRequestListeners(io, socket);
    // errorListeners(socket);
  });
  return moderateRoomNamespace;
}

export default ModerateRoomsNsp;
