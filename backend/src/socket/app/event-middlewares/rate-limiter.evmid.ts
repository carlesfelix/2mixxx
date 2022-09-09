import { Socket } from "socket.io";
import { AnyUserAuth } from "../../../core/types/UserAuth";
import { generalRateLimiter } from "../services/rate-limiters";
import SocketError, { StatusCodeEnum } from "../services/SocketError";

export default function rateLimiterEvMid(
  socket: Socket,
  excludedEvents: string[] = []
): void {
  socket.use(([ eventName ], next) => {
    const anyUser: AnyUserAuth = socket.data.auth;
    const key = `user|${anyUser.type}|${anyUser.id!}`;
    if (excludedEvents.includes(eventName)) {
      next();
    } else {
      generalRateLimiter.consume(key, 20).then(() => {
        next();
      }).catch(() => {
        next((new SocketError(StatusCodeEnum.TooManyEmits)).toNative());
      });
    }
  });
}
