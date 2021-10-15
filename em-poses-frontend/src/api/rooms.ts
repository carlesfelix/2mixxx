import http from '../services/http';
import Room from '../types/Room';

export async function getAllRooms(): Promise<Room[]> {
  const { data } = await http.get<Room[]>('/rooms');
  return data;
}

export async function createRoom(): Promise<Room> {
  const { data } = await http.post<Room>('/rooms', undefined);
  return data;
}

export async function deleteRoom(id: string): Promise<void> {
  await http.delete(`/rooms/${id}`);
}
