import http from '../services/http';
import { RegisteredUserAuth, RoomUserAuth } from '../types/UserMe';

export async function getMe<
  MeResponse extends RegisteredUserAuth | RoomUserAuth
>(): Promise<MeResponse> {
  const { data } = await http.get<MeResponse>('/me');
  return data;
}
