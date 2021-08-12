import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRepository from '../../repositories/ISongRepository';
import { getTracksFromItunesXml } from '../../services/utils';

type Props = {
  fileBuffer: Buffer;
  mimetype: BufferEncoding;
  libraryId: string;
};
const interactorFn = (songRepo: ISongRepository) => async (props: Props): Promise<void> => {
  const { fileBuffer, mimetype, libraryId } = props;
  const itunesTracks = await getTracksFromItunesXml({
    fileBuffer, encoding: mimetype, libraryId
  });
  await songRepo.importSongsToLibrary(itunesTracks);
};
export default interactorFn(dataSourcesConfig.song);
