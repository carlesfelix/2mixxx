import dataSourcesConfig from '../../constants/data-sources.config';
import { ILibraryEntity } from '../../entities/ILibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (libraryId: string, library: ILibraryEntity): Promise<number> => {
  return libraryRepo.updateLibrary(libraryId, library);
};
export default interactorFn(dataSourcesConfig.library);
