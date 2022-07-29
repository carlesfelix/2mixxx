import dataSourcesConfig from '../../constants/data-sources.config';
import SongEntity from '../../types/SongEntity';
import ISongRepository from '../../repositories/ISongRepository';
import { RoomUserAuth } from '../../types/UserAuth';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

type Props = {
  userAuth: RoomUserAuth,
  query: string;
};
type Repositories = {
  libraryRepo: ISongRepository;
  roomRepo: IRoomsRepository;
}
const interactorFn = (repositories: Repositories) => async (props: Props): Promise<SongEntity[]> => {
  const { libraryRepo, roomRepo } = repositories;
  const { userAuth, query } = props;
  const room = await roomRepo.getRoomById(userAuth.roomId);
  if (!room) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  const { libraries = [] } = room;

  return libraryRepo.searchSongsFromLibraries(
    libraries.map(({ id }) => id!),
    query
  );
};
export default interactorFn({
  libraryRepo: dataSourcesConfig.song,
  roomRepo: dataSourcesConfig.room
});

