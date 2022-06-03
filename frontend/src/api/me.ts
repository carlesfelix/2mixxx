import http from '../services/http';
import Room from '../types/Room';
import User from '../types/User';
import { AnyUserAuth } from '../types/UserMe';

export async function getMe<
  U extends User = User
>(): Promise<AnyUserAuth<U>> {
  const { data } = await http.get<AnyUserAuth<U>>('/me');
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
