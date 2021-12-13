import http from '../services/http';
import Room from '../types/Room';
import { RegisteredUserAuth, RoomUserAuth } from '../types/UserMe';

export async function getMe<
  MeResponse extends RegisteredUserAuth | RoomUserAuth
>(): Promise<MeResponse> {
  const { data } = await http.get<MeResponse>('/me');
  return data;
}

export async function getMyRooms(): Promise<Room[]> {
  const { data } = await http.get<Room[]>('/me/my-rooms');
  return data;
}

export async function getMyRoomById(id: string): Promise<Room> {
  const { data } = await http.get<Room>(`/me/my-rooms/${id}`);
  return data;
}
