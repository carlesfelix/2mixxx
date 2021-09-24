import IRoomEntity from '../entities/IRoomEntity';

export default interface IRoomsRepository {
  createRoom(room: IRoomEntity): Promise<IRoomEntity>;
  deleteRoom(roomId: string): Promise<number>;
  getRoomById(roomId: string): Promise<IRoomEntity | null>;
  getAllRooms(): Promise<IRoomEntity[]>;
}
