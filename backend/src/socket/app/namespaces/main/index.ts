import { Namespace, Server } from 'socket.io';
import authMid from '../../middlewares/auth.mid';
import joinRoomUsersMid from './middlewares/join-room-users.mid';
import errorListeners from './listeners/error.listeners';
import songRequestListeners from './listeners/song-request.listeners';
import rateLimiterMid from '../../middlewares/rate-limiter.mid';

function MainNsp(io: Server): Namespace {
  const mainNamespace = io.of('/');
  mainNamespace.use(authMid);
  mainNamespace.use(joinRoomUsersMid);
  mainNamespace.on('connection', socket => {
    socket.use(rateLimiterMid(socket));
    songRequestListeners(io, socket);
    errorListeners(socket);
  });
  return mainNamespace;
}

export default MainNsp;
