import dataSourcesConfig from '../../constants/data-sources.config';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (libraryRepo: ILibraryRepository) => async (libraryId: string): Promise<void> => {
  const deleteCount = await libraryRepo.deleteLibrary(libraryId);
  if (!deleteCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.library);
