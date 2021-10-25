import RoomUserEntity from '../../../core/types/RoomUserEntity';
import IRoomUserRepository from '../../../core/repositories/IRoomUserRepository';
import { instanceToJson } from '../helpers';
import models from '../models';

export default class RoomUser implements IRoomUserRepository {
  async getUserById(userId: string): Promise<RoomUserEntity | null> {
    const data = await models.RoomUser.model.findByPk(userId);
    return instanceToJson<RoomUserEntity>(data);
  }
  async createUser(roomId: string): Promise<RoomUserEntity> {
    const data = await models.RoomUser.model.create({
      roomId
    });
    return instanceToJson<RoomUserEntity>(data) as RoomUserEntity;
  }
  async deleteUser(userId: string): Promise<number> {
    const deleteCount = await models.RoomUser.model.destroy({
      where: { id: userId },
      limit: 1
    });
    return deleteCount;
  }
}