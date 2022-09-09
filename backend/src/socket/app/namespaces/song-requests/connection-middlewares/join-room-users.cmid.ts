import { Namespace } from "socket.io";
import { RoomUserAuth } from "../../../../../core/types/UserAuth";
import SocketError, { StatusCodeEnum } from "../../../services/SocketError";

export default function joinRoomUsersCMid(namespace: Namespace): void {
  namespace.use((socket, next) => {
    const auth: RoomUserAuth | undefined = socket.data.auth;
    if (auth && auth.type === 'roomUser') {
      socket.join(auth.roomId);
      next();
    } else {
      next(new SocketError(StatusCodeEnum.AccessDenied).toNative());
    }
  });
}
