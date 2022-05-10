import dataSourcesConfig from '../../constants/data-sources.config';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import ISongRepository from '../../repositories/ISongRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import SongEntity from '../../types/SongEntity';

type Props = {
  songs: SongEntity[];
  libraryId: string;
};
const interactorFn = (
  songRepo: ISongRepository,
  libraryRepo: ILibraryRepository
) => async (props: Props): Promise<void> => {
  const { songs, libraryId } = props;
  const library = await libraryRepo.getLibraryById(libraryId);
  if (!library) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  await songRepo.importSongsToLibrary(songs.map(song => ({
    ...song,
    libraryId
  })));
};
export default interactorFn(dataSourcesConfig.song, dataSourcesConfig.library);
