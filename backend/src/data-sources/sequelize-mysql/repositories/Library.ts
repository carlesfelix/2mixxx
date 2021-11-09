import { literal } from 'sequelize';
import { Literal } from 'sequelize/types/lib/utils';
import LibraryEntity from '../../../core/types/LibraryEntity';
import ILibraryRepository from '../../../core/repositories/ILibraryRepository';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class Library implements ILibraryRepository {
  private getSongsSubQuery(): Literal {
    return literal(`(
      SELECT COUNT(*)
      FROM Songs AS Song
      WHERE
        Song.libraryId = Library.id
    )`);
  }
  async getLibraries(): Promise<LibraryEntity[]> {
    const libraries = await models.Library.model.findAll({
      attributes: {
        include: [
          [
            this.getSongsSubQuery(),
            'songs'
          ]
        ]
      }
    });
    return instancesToJson<LibraryEntity>(libraries);
  }
  async getLibraryById(libraryId: string): Promise<LibraryEntity | null> {
    const library = await models.Library.model.findOne({
      where: {
        id: libraryId
      },
      attributes: {
        include: [
          [
            this.getSongsSubQuery(),
            'songs'
          ]
        ]
      },
      limit: 1
    });
    return instanceToJson<LibraryEntity>(library);
  }
  async createLibrary(library: LibraryEntity): Promise<LibraryEntity> {
    const createdLibrary = await models.Library.model.create(library);
    return instanceToJson<LibraryEntity>(createdLibrary) as LibraryEntity;
  }
  async deleteLibrary(libraryId: string): Promise<number> {
    const destroyCount = await models.Library.model.destroy({
      where: {
        id: libraryId
      },
      limit: 1
    });
    return destroyCount;
  }
  async updateLibrary(libraryId: string, library: LibraryEntity): Promise<number> {
    const [ updateNumber ] = await models.Library.model.update(library, {
      where: {
        id: libraryId
      },
      limit: 1
    });
    return updateNumber;
  }
}
