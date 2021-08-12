import { Op } from 'sequelize';
import { ISongEntity } from '../../../core/entities/ISongEntity';
import ISongRepository from '../../../core/repositories/ISongRepository';
import { instancesToJson } from '../helpers';
import models from '../models';

export default class Song implements ISongRepository {
  removeSongsFromLibrary(libraryId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async importSongsToLibrary(libraryId: string, tracks: ISongEntity[]): Promise<void> {
    await models.Song.model.destroy({
      truncate: true
    });
    await models.Song.model.bulkCreate(tracks);
  }
  async searchSongsFromLibrary(library: string, query: string): Promise<ISongEntity[]> {
    const tracks = await models.Song.model.findAll({
      where: {
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
