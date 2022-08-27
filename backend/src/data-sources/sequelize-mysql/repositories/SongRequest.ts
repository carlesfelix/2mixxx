import ISongRequestRepository from '../../../core/repositories/ISongRequestRepository';
import SongRequestEntity from '../../../core/types/SongRequestEntity';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';
import TTransaction from 'sequelize/types/transaction';

export default class SongRequest implements ISongRequestRepository {
  async getSongRequestsCountFromRoom(roomId: string, t: TTransaction): Promise<number> {
    const count = await models.SongRequest.model.count({
      where: { roomId },
      transaction: t
    });
    return count;
  }
  async getSongRequestsFromRoom(roomId: string): Promise<SongRequestEntity[]> {
    const data = await models.SongRequest.model.findAll({
      where: { roomId },
      order: [[ 'createdAt', 'ASC' ]],
      include: [{ model: models.Song.model, as: 'song' }]
    });
    return instancesToJson<SongRequestEntity>(data);
  }
  async getSongRequestById(id: string, t: TTransaction): Promise<SongRequestEntity | null> {
    const data = await models.SongRequest.model.findByPk(id, {
      include: [{ model: models.Song.model, as: 'song' }],
      transaction: t
    });
    return instanceToJson<SongRequestEntity>(data);
  }
  async addSongRequest(data: {
    roomUserId: string;
    songId: string;
    roomId: string
  }, t?: TTransaction): Promise<SongRequestEntity> {
    const createdData = await models.SongRequest.model.create(
      data, { transaction: t }
    );
    return instanceToJson<SongRequestEntity>(createdData) as SongRequestEntity;
  }
  async removeSongRequest(id: string, roomId: string): Promise<number> {
    const deleteCount = await models.SongRequest.model.destroy({
      where: { id, roomId },
      limit: 1
    });
    return deleteCount;
  }

}