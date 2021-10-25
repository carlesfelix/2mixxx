import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (libraryId: string): Promise<LibraryEntity | null> => {
  return libraryRepo.getLibraryById(libraryId);
};
export default interactorFn(dataSourcesConfig.library);
