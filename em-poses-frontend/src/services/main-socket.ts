import environment from '../environment';
import socket from './socket';

const mainSocket = socket(environment.REACT_APP_SOCKET_BASE_URI);

export function connectToMainSocket(
  tokenFn: () => Promise<{
    authorization: string, userType: 'roomUser' | 'registeredUser'
  }>
): void {
  mainSocket.setAuthInterceptor(tokenFn);
  mainSocket.connect();
}

export function disconnectToMainSocket(): void {
  mainSocket.disconnect();
  mainSocket.removeAuthInterceptor();
}

export default mainSocket;
