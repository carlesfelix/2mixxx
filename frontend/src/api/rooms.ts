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

export async function getRoomById(roomId: string): Promise<Room> {
  const { data } = await http.get<Room>(`/rooms/${roomId}`);
  return data;
}

export async function addLibraryToRoom(roomId: string, libraryId: string): Promise<void> {
  await http.post(`/rooms/${roomId}/libraries`, { libraryId });
}

export async function deleteLibraryFromRoom(roomId: string, libraryId: string): Promise<void> {
  await http.delete(`/rooms/${roomId}/libraries/${libraryId}`);
}

export async function addModeratorToRoom(roomId: string, registeredUserId: string): Promise<void> {
  await http.post(`/rooms/${roomId}/moderators`, { registeredUserId });
}

export async function deleteModeratorFromRoom(roomId: string, registeredUserId: string): Promise<void> {
  await http.delete(`/rooms/${roomId}/moderators/${registeredUserId}`);
}
