import { Server } from "socket.io";
import authCMid from "../../connection-middlewares/auth.cmid";
import joinRoomUsersCMid from "./connection-middlewares/join-room-users.cmid";
import rateLimiterEvMid from "../../event-middlewares/rate-limiter.evmid";
import errorListeners from "../../listeners/error.listeners";
import songRequestListeners from "./listeners/song-request.listeners";

export default function songRequestsNsp(io: Server): void {
  const namespace = io.of('/');
  authCMid(namespace);
  joinRoomUsersCMid(namespace);
  namespace.on('connection', socket => {
    rateLimiterEvMid(socket);
    songRequestListeners(io, socket);
    errorListeners(socket);
  });
}
