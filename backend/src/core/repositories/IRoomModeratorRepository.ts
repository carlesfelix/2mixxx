import RoomModeratorEntity from '../types/RoomModeratorEntity';

export default interface IRoomModeratorRepository {
  getRoomModeratorsByUserId(registeredUserId: string): Promise<RoomModeratorEntity[]>;
  getRoomModerator(registeredUserId: string, roomId:string): Promise<RoomModeratorEntity | null>;
}
