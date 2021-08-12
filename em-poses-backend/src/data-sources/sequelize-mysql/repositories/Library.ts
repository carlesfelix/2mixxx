import { ILibraryEntity } from '../../../core/entities/ILibraryEntity';
import ILibraryRepository from '../../../core/repositories/ILibraryRepository';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class Library implements ILibraryRepository {
  async getLibraries(): Promise<ILibraryEntity[]> {
    const libraries = await models.Library.model.findAll();
    return instancesToJson<ILibraryEntity>(libraries);
  }
  async getLibraryById(libraryId: string): Promise<ILibraryEntity | null> {
    const library = await models.Library.model.findByPk(libraryId);
    return instanceToJson<ILibraryEntity>(library);
  }
  async createLibrary(library: ILibraryEntity): Promise<ILibraryEntity> {
    const createdLibrary = await models.Library.model.create(library);
    return instanceToJson<ILibraryEntity>(createdLibrary) as ILibraryEntity;
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
  async updateLibrary(libraryId: string,library: ILibraryEntity): Promise<number> {
    const [ updateNumber ] = await models.Library.model.update(library, {
      where: {
        id: libraryId
      },
      limit: 1
    });
    return updateNumber;
  }
}
