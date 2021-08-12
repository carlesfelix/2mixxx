import dataSourcesConfig from '../../constants/data-sources.config';
import { ILibraryEntity } from '../../entities/ILibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (library: ILibraryEntity): Promise<ILibraryEntity> => {
  return libraryRepo.createLibrary(library);
};
export default interactorFn(dataSourcesConfig.library);
