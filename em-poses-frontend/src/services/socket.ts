import { io, Socket } from 'socket.io-client';

type AuthInterceptorFn<AuthData extends object = object> = () => Promise<AuthData>;
export default function socket(uri: string): {
  socket: Socket,
  setAuthInterceptor: (fn: AuthInterceptorFn) => void,
  removeAuthInterceptor: () => void;
} {
  let authInterceptor: AuthInterceptorFn | undefined;
  return {
    socket: io(uri, {
      autoConnect: false,
      auth: cb => {
        if (authInterceptor) {
          authInterceptor().then(authData => {
            cb(authData);
          }).catch(() => {
            cb({});
          });
        } else {
          cb({});
        }
      }
    }),
    setAuthInterceptor: fn => {
      authInterceptor = fn;
    },
    removeAuthInterceptor: () => {
      authInterceptor = undefined;
    }
  };
}
