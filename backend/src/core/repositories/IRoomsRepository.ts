import RoomEntity from '../types/RoomEntity';

export default interface IRoomsRepository {
  createRoom(room: RoomEntity): Promise<RoomEntity>;
  deleteRoom(roomId: string): Promise<number>;
  getRoomById(roomId: string): Promise<RoomEntity | null>;
  getRoomByCode(roomCode: string): Promise<RoomEntity | null>;
  getAllRooms(registeredUserId: string): Promise<RoomEntity[]>;
  addLibraryToRoom(roomId: string, libraryId: string): Promise<void>;
  deleteLibraryFromRoom(roomId: string, libraryId: string): Promise<number>;
  addModeratorToRoom(roomId: string, registeredUserId: string): Promise<void>;
  removeModeratorFromRoom(roomId: string, registeredUserId: string): Promise<number>;
}
