import { io } from 'socket.io-client';
import SocketAck from '../types/SocketAck';

export default function socket(uri: string) {
  let authInterceptor: (() => Promise<object>) | undefined;
  const _socket = io(uri, {
    autoConnect: false,
    auth: cb => {
      if (authInterceptor) {
        authInterceptor().then(auth => {
          cb(auth);
        }).catch(() => {
          cb({});
        });
      } else {
        cb({});
      }
    }
  });
  function connect(): void {
    _socket.connect();
  }
  function disconnect(): void {
    _socket.disconnect();
  }
  function removeAuthInterceptor(): void {
    authInterceptor = undefined;
  }
  function setAuthInterceptor<Auth extends object>(fn: () => Promise<Auth>): void {
    authInterceptor = fn;
  }
  function on<ListenerResponse = any>(
    event: string,
    listener: (response: ListenerResponse) => void
  ): void {
    _socket.on(event, listener);
  }
  function emitWithAck<Ack = any>(
    action: { event: string, payload?: object }
  ): Promise<Ack> {
    return new Promise((resolve, reject) => {
      const { event, payload = {} } = action;
      _socket.emit(event, payload, (ackResponse: SocketAck<Ack>) => {
        console.log('entra', ackResponse)
        if (ackResponse.error) {
          reject(ackResponse.error);
          return;
        }
        resolve(ackResponse.data);
      });
    });
  }
  function emit(
    action: { event: string, payload?: object }
  ): void {
    const { event, payload = {} } = action;
    _socket.emit(event, payload);
  }
  return {
    connect, disconnect, setAuthInterceptor,
    on, emitWithAck, emit, removeAuthInterceptor
  };
}
