import { Op } from 'sequelize';
import SongEntity from '../../../core/types/SongEntity';
import ISongRepository from '../../../core/repositories/ISongRepository';
import { instancesToJson } from '../helpers';
import models from '../models';

export default class Song implements ISongRepository {
  removeSongsFromLibrary(libraryId: string): Promise<number> {
    return models.Song.model.destroy({
      where: { libraryId }
    });
  }
  async importSongsToLibrary(tracks: SongEntity[]): Promise<void> {
    await models.Song.model.bulkCreate(tracks);
  }
  async searchSongsFromLibraries(libraries: string[], query: string): Promise<SongEntity[]> {
    const tracks = await models.Song.model.findAll({
      where: {
        libraryId: {
          [Op.in]: libraries
        },
        [Op.or]: {
          title: {
            [Op.substring]: query
          },
          artist: {
            [Op.substring]: query
          }
        },
      },
      order: [[ 'libraryId', 'ASC' ]],
      limit: 8
    });
    return instancesToJson<SongEntity>(tracks);
  }
}
