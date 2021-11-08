import environment from '../environment';
import socket from './socket';

const mainSocket = socket(environment.REACT_APP_SOCKET_BASE_URI);

export function connectToMainSocket(
  tokenFn: () => Promise<{
    authorization: string, userType: 'roomUser' | 'registeredUser'
  }>
): void {
  mainSocket.setAuthInterceptor(tokenFn);
  mainSocket.socket.connect();
}

mainSocket.socket.on('connect_error', (err) => {
  console.log(err instanceof Error);
  console.log(err.message);
});

export function disconnectToMainSocket(): void {
  mainSocket.socket.disconnect();
  mainSocket.removeAuthInterceptor();
}

export default mainSocket.socket;
