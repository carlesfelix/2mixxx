import dataSourcesConfig from '../../constants/data-sources.config';
import ILibraryRepository from '../../repositories/ILibraryRepository';
import { getTracksFromItunesXml } from '../../services/utils';

const interactorFn = (libraryRepo: ILibraryRepository) => async (fileBuffer: Buffer, mimeType: BufferEncoding): Promise<void> => {
  const itunesTracks = await getTracksFromItunesXml(fileBuffer, mimeType);
  return libraryRepo.importLibraryFromItunes(itunesTracks);
};
export default interactorFn(dataSourcesConfig.library);
