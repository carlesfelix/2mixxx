import http from '../services/http';

export async function createRoomUser(roomCode: string): Promise<string> {
  const { data } = await http.post<{ token: string }>('/room-users', {
    roomCode
  });
  const { token } = data;
  return token;
}
