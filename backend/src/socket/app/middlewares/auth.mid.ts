import { Socket } from 'socket.io';
import getUserAuth from '../../../core/interactors/auth/getUserAuth';

export default function authMid(socket: Socket, next: (error?: Error) => void): void {
  if (socket.handshake.auth) {
    const { authorization, userType } = socket.handshake.auth;
    if (typeof authorization === 'string' && typeof userType === 'string') {
      getUserAuth(userType, authorization).then(auth => {
        socket.data.auth = auth;
        next();
      }).catch(err => {
        next(err);
      });
    }
  } else {
    next(new Error('Token required!'));
  }
}
