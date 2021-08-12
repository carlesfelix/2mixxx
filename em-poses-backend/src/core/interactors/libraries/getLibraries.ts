import dataSourcesConfig from '../../constants/data-sources.config';
import { ILibraryEntity } from '../../entities/ILibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';

const interactorFn = (libraryRepo: ILibraryRepository) => (): Promise<ILibraryEntity[]> => {
  return libraryRepo.getLibraries();
};
export default interactorFn(dataSourcesConfig.library);
