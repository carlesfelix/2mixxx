import dataSourcesConfig from '../../constants/data-sources.config';
import { ISongEntity } from '../../entities/ISongEntity';
import ISongRepository from '../../repositories/ISongRepository';

type Props = {
  libraryId: string;
  query: string;
};
const interactorFn = (libraryRepo: ISongRepository) => async (props: Props): Promise<ISongEntity[]> => {
  const { libraryId, query } = props;
  return libraryRepo.searchSongsFromLibrary(libraryId, query);
};
export default interactorFn(dataSourcesConfig.song);
