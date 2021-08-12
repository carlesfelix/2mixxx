import dataSourcesConfig from '../../constants/data-sources.config';
import { ILibraryEntity } from '../../entities/ILibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (libraryId: string): Promise<ILibraryEntity | null> => {
  return libraryRepo.getLibraryById(libraryId);
};
export default interactorFn(dataSourcesConfig.library);
