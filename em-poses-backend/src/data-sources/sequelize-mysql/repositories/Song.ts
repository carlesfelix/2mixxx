import { Op } from 'sequelize';
import { ISongEntity } from '../../../core/entities/ISongEntity';
import ISongRepository from '../../../core/repositories/ISongRepository';
import { instancesToJson } from '../helpers';
import models from '../models';

export default class Song implements ISongRepository {
  async removeSongsFromLibrary(libraryId: string): Promise<void> {
    await models.Song.model.destroy({
      where: { libraryId }
    });
  }
  async importSongsToLibrary(tracks: ISongEntity[]): Promise<void> {
    await models.Song.model.bulkCreate(tracks);
  }
  async searchSongsFromLibrary(libraryId: string, query: string): Promise<ISongEntity[]> {
    const tracks = await models.Song.model.findAll({
      where: {
        libraryId,
        [Op.or]: {
          title: {
            [Op.substring]: query
          },
          artist: {
            [Op.substring]: query
          }
        }
      },
      limit: 8
    });
    return instancesToJson<ISongEntity>(tracks);
  }
}
