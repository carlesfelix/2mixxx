import IRoomEntity from '../../../core/entities/IRoomEntity';
import IRoomsRepository from '../../../core/repositories/IRoomsRepository';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class Room implements IRoomsRepository {
  async getLibrariesFromRoom(roomId: string): Promise<IRoomEntity | null> {
    const data = await models.Room.model.findOne({
      where: { id: roomId },
      limit: 1,
      include: [
        {
          model: models.Library.model,
          as: 'libraries',
          through: { attributes: [] }
        }
      ]
    });
    return instanceToJson<IRoomEntity>(data);
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
  async createRoom(room: IRoomEntity): Promise<IRoomEntity> {
    const data = await models.Room.model.create(room);
    return instanceToJson<IRoomEntity>(data) as IRoomEntity;
  }
  async deleteRoom(roomId: string): Promise<number> {
    const deleteCount = await models.Room.model.destroy({
      where: { id: roomId }, limit: 1
    });
    return deleteCount;
  }
  async getRoomById(roomId: string): Promise<IRoomEntity | null> {
    const data = await models.Room.model.findByPk(roomId);
    return instanceToJson<IRoomEntity>(data);
  }
  async getAllRooms(): Promise<IRoomEntity[]> {
    const data = await models.Room.model.findAll();
    return instancesToJson<IRoomEntity>(data);
  }
}
