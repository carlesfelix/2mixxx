import { Server } from "socket.io";
import authCMid from "../../connection-middlewares/auth.cmid";
import joinModeratorToRoomCMid from "./connection-middlewares/join-moderator-to-room.cmid";
import { CLIENT__DELETE_SONG_REQUEST } from "../../constants/client-actions";
import rateLimiterEvMid from "../../event-middlewares/rate-limiter.evmid";
import songRequestListeners from "./listeners/song-request.listeners";
import errorListeners from "../../listeners/error.listeners";

export default function moderateRoomsNsp(io: Server): void {
  const namespace = io.of(/^\/moderate-rooms\/[0-9a-z-]{36}$/);
  authCMid(namespace);
  joinModeratorToRoomCMid(namespace);
  namespace.on('connection', socket => {
    rateLimiterEvMid(
      socket,
      [CLIENT__DELETE_SONG_REQUEST]
    );
    songRequestListeners(io, socket);
    errorListeners(socket);
  });
}