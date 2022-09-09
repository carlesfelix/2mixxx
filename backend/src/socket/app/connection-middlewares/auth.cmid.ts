import { Namespace } from "socket.io";
import getUserAuth from "../../../core/interactors/auth/getUserAuth";
import SocketError, { StatusCodeEnum } from "../services/SocketError";

export default function authCMid(namespace: Namespace): void {
  namespace.use((socket, next) => {
    if (socket.handshake.auth) {
      const { authorization, userType } = socket.handshake.auth;
      if (typeof authorization === 'string' && typeof userType === 'string') {
        getUserAuth(userType, authorization).then(auth => {
          socket.data.auth = auth;
          next();
        }).catch(() => {
          next(new SocketError(StatusCodeEnum.InternalError).toNative());
        });
      } else {
        next(new SocketError(StatusCodeEnum.AccessDenied).toNative());
      }
    } else {
      next(new SocketError(StatusCodeEnum.Unauthorized).toNative());
    }
  });
}
