import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (library: LibraryEntity): Promise<LibraryEntity> => {
  return libraryRepo.createLibrary(library);
};
export default interactorFn(dataSourcesConfig.library);
