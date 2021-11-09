import RoomUserEntity from '../types/RoomUserEntity';

export default interface IRoomUserRepository {
  createUser(roomId: string): Promise<RoomUserEntity>;
  deleteUser(userId: string): Promise<number>;
  getUserById(userId: string): Promise<RoomUserEntity | null>;
}