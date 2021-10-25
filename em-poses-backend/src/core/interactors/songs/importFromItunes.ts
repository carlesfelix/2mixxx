import dataSourcesConfig from '../../constants/data-sources.config';
import LibraryEntity from '../../types/LibraryEntity';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import ISongRepository from '../../repositories/ISongRepository';
import { getTracksFromItunesXml } from '../../services/utils';

type Props = {
  fileBuffer: Buffer;
  mimetype: BufferEncoding;
  libraryId: string;
};
const interactorFn = (songRepo: ISongRepository, libraryRepo: ILibraryRepository) => async (props: Props): Promise<LibraryEntity | null> => {
  const { fileBuffer, mimetype, libraryId } = props;
  const itunesTracks = await getTracksFromItunesXml({
    fileBuffer, encoding: mimetype, libraryId
  });
  await songRepo.importSongsToLibrary(itunesTracks);
  return libraryRepo.getLibraryById(libraryId);
};
export default interactorFn(dataSourcesConfig.song, dataSourcesConfig.library);
