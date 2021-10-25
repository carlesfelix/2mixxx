import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (libraryId: string, library: LibraryEntity): Promise<number> => {
  return libraryRepo.updateLibrary(libraryId, library);
};
export default interactorFn(dataSourcesConfig.library);
