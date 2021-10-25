import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (): Promise<LibraryEntity[]> => {
  return libraryRepo.getLibraries();
};
export default interactorFn(dataSourcesConfig.library);
