import IRoomsRepository from '../../../core/repositories/IRoomsRepository';
import RoomEntity from '../../../core/types/RoomEntity';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class Room implements IRoomsRepository {
  async addModeratorToRoom(roomId: string, registeredUserId: string): Promise<void> {
    await models.RoomModerator.model.create({
      roomId, registeredUserId
    });
  }
  async removeModeratorFromRoom(roomId: string, registeredUserId: string): Promise<number> {
    const deleteCount = await models.RoomModerator.model.destroy({
      where: { roomId, registeredUserId },
      limit: 1
    });
    return deleteCount;
  }
  async getRoomByCode(roomCode: string): Promise<RoomEntity | null> {
    const data = await models.Room.model.findOne({
      where: { code: roomCode },
      limit: 1,
      include: [
        {
          model: models.Library.model,
          as: 'libraries',
          through: { attributes: [] }
        },
        {
          model: models.RegisteredUser.model,
          as: 'moderators',
          through: { attributes: [] }
        }
      ]
    });
    return instanceToJson<RoomEntity>(data);
  }
  async addLibraryToRoom(roomId: string, libraryId: string): Promise<void> {
    await models.LibraryRoom.model.create({
      libraryId, roomId
    });
  }
  async deleteLibraryFromRoom(roomId: string, libraryId: string): Promise<number> {
    const deleteCount = await models.LibraryRoom.model.destroy({
      where: { libraryId, roomId },
      limit: 1
    });
    return deleteCount;
  }
  async createRoom(room: RoomEntity): Promise<RoomEntity> {
    const data = await models.Room.model.create(room);
    return instanceToJson<RoomEntity>(data) as RoomEntity;
  }
  async deleteRoom(roomId: string): Promise<number> {
    const deleteCount = await models.Room.model.destroy({
      where: { id: roomId }, limit: 1
    });
    return deleteCount;
  }
  async getRoomById(roomId: string): Promise<RoomEntity | null> {
    const data = await models.Room.model.findOne({
      where: { id: roomId },
      limit: 1,
      include: [
        {
          model: models.Library.model,
          as: 'libraries',
          through: { attributes: [] }
        },
        {
          model: models.RegisteredUser.model,
          as: 'moderators',
          through: { attributes: [] }
        }
      ]
    });
    return instanceToJson<RoomEntity>(data);
  }
  async getAllRooms(): Promise<RoomEntity[]> {
    const data = await models.Room.model.findAll({
      order: [['createdAt', 'DESC']]
    });
    return instancesToJson<RoomEntity>(data);
  }
}
