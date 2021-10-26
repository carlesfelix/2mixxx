import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import ISongRepository from '../../repositories/ISongRepository';
import { getTracksFromItunesXml } from '../../services/utils';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

type Props = {
  fileBuffer: Buffer;
  mimetype: BufferEncoding;
  libraryId: string;
};
const interactorFn = (songRepo: ISongRepository, libraryRepo: ILibraryRepository) => async (props: Props): Promise<LibraryEntity> => {
  const { fileBuffer, mimetype, libraryId } = props;
  const library = await libraryRepo.getLibraryById(libraryId);
  if (!library) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  const itunesTracks = await getTracksFromItunesXml({
    fileBuffer, encoding: mimetype, libraryId
  });
  try {
    await songRepo.importSongsToLibrary(itunesTracks)
  } catch {
    throw new InteractorError(InteractorErrorCodeEnum.GENERIC, 'File cannot be read');
  }
  return {
    ...library,
    songs: itunesTracks.length + (library.songs || 0)
  };
};
export default interactorFn(dataSourcesConfig.song, dataSourcesConfig.library);
