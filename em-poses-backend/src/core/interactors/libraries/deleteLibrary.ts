import dataSourcesConfig from '../../constants/data-sources.config';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (libraryId: string): Promise<number> => {
  return libraryRepo.deleteLibrary(libraryId);
};
export default interactorFn(dataSourcesConfig.library);
