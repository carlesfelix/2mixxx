import dataSourcesConfig from '../../constants/data-sources.config';
import SongEntity from '../../types/SongEntity';
import ISongRepository from '../../repositories/ISongRepository';

type Props = {
  libraryId: string;
  query: string;
};
const interactorFn = (libraryRepo: ISongRepository) => async (props: Props): Promise<SongEntity[]> => {
  const { libraryId, query } = props;
  return libraryRepo.searchSongsFromLibrary(libraryId, query);
};
export default interactorFn(dataSourcesConfig.song);
