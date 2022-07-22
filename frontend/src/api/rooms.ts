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

export async function roomCodeExists(code: string): Promise<boolean> {
  const { data } = await http.get<{ exists: boolean }>(
    '/rooms/exists', { params: { code } }
  );
  return data.exists;
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

export async function getRoomQr(
  roomId: string,
  docHeader: string
): Promise<Blob> {
  const { data } = await http.get<Blob>(
    `/rooms/${roomId}/qr`,
    {
      responseType: 'blob',
      params: { docHeader }
    }
  );
  return data;
}
