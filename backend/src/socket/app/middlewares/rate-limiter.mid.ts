import { Socket } from "socket.io";
import { AnyUserAuth } from "../../../core/types/UserAuth";
import { generalRateLimiter } from "../services/rate-limiters";
import SocketError, { StatusCodeEnum } from "../services/SocketError";

export default function rateLimiterMid(
  socket: Socket
): (
  [event, ...args]: [string, ...unknown[]],
  next: (error?: Error) => void
) => void {
  return (_, next) => {
    const anyUser: AnyUserAuth = socket.data.auth;
    const key = `user|${anyUser.type}|${anyUser.id!}`;
    generalRateLimiter.consume(key, 20).then(() => {
      next();
    }).catch(() => {
      next(new SocketError(StatusCodeEnum.TooManyEmits));
    });
  }
}
