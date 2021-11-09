import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (libraryRepo: ILibraryRepository) => async (libraryId: string): Promise<LibraryEntity> => {
  const data = await libraryRepo.getLibraryById(libraryId);
  if (!data) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  return data;
};
export default interactorFn(dataSourcesConfig.library);
