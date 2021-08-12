import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRepository from '../../repositories/ISongRepository';
import { getTracksFromItunesXml } from '../../services/utils';

type Props = {
  fileBuffer: Buffer;
  mimetype: BufferEncoding;
  libraryId: string;
};
const interactorFn = (libraryRepo: ISongRepository) => async (props: Props): Promise<void> => {
  const { fileBuffer, mimetype, libraryId } = props;
  const itunesTracks = await getTracksFromItunesXml(fileBuffer, mimetype);
  return libraryRepo.importSongsToLibrary(libraryId, itunesTracks);
};
export default interactorFn(dataSourcesConfig.song);
