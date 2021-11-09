import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (libraryRepo: ILibraryRepository) => async (libraryId: string, library: LibraryEntity): Promise<void> => {
  const updateCount = await libraryRepo.updateLibrary(libraryId, library);
  if (!updateCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.library);
