import dataSourcesConfig from "../../constants/data-sources.config";
import ILibraryRepository from "../../repositories/ILibraryRepository";
import ISongRepository from "../../repositories/ISongRepository";
import InteractorError, { InteractorErrorCodeEnum } from "../../services/InteractorError";

const interactorFn = (songsRepo: ISongRepository, libraryRepo: ILibraryRepository) => async (libraryId: string): Promise<void> => {
  const library = await libraryRepo.getLibraryById(libraryId);
  if (!library) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  await songsRepo.removeSongsFromLibrary(libraryId);
}

export default interactorFn(dataSourcesConfig.song, dataSourcesConfig.library);
