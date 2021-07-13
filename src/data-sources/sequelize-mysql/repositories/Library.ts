import { Op } from 'sequelize';
import { ITrackEntity } from '../../../core/entities/ITrackEntity';
import ILibraryRepository from '../../../core/repositories/ILibraryRepository';
import { instancesToJson } from '../helpers';
import models from '../models';

export default class Library implements ILibraryRepository {
  async importTracks(tracks: ITrackEntity[]): Promise<void> {
    await models.Track.model.destroy({
      truncate: true
    });
    await models.Track.model.bulkCreate(tracks);
  }
  async searchTracks(query: string): Promise<ITrackEntity[]> {
    const tracks = await models.Track.model.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.substring]: query
          },
          artist: {
            [Op.substring]: query
          }
        }
      },
      limit: 8
    });
    return instancesToJson<ITrackEntity>(tracks);
  }
}
