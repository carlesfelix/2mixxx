import ISongRequestRepository from '../../../core/repositories/ISongRequestRepository';
import SongRequestEntity from '../../../core/types/SongRequestEntity';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';
export default class SongRequest implements ISongRequestRepository {
  async getSongRequestsFromRoom(roomId: string): Promise<SongRequestEntity[]> {
    const data = await models.SongRequest.model.findAll({
      where: { roomId },
      include: [{ model: models.Song.model, as: 'song' }]
    });
    return instancesToJson<SongRequestEntity>(data);
  }
  async getSongRequestById(id: string): Promise<SongRequestEntity | null> {
    const data = await models.SongRequest.model.findByPk(id, {
      include: [{ model: models.Song.model, as: 'song' }]
    });
    return instanceToJson<SongRequestEntity>(data);
  }
  async addSongRequest(data: {
    roomUserId: string;
    songId: string;
    roomId: string
  }): Promise<SongRequestEntity> {
    const createdData = await models.SongRequest.model.create(data);
    return instanceToJson<SongRequestEntity>(createdData) as SongRequestEntity;
  }
  async removeSongRequest(id: string): Promise<number> {
    const deleteCount = await models.SongRequest.model.destroy({
      where: { id },
      limit: 1
    });
    return deleteCount;
  }

}