import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRequestRepository from '../../repositories/ISongRequestRepository'
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import SongRequestEntity from '../../types/SongRequestEntity'
import UserAuth from '../../types/UserAuth';

const getSongRequestsFromRoomInteractorFn = (
  songRequestRepo: ISongRequestRepository
) => async (userAuth?: UserAuth): Promise<SongRequestEntity[]> => {
  if (userAuth && userAuth.type === 'roomUser') {
    const data = await songRequestRepo.getSongRequestsFromRoom(
      userAuth.user.roomId
    );
    return data;
  }
  throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
}

const getSongRequestsFromRoomInteractor = getSongRequestsFromRoomInteractorFn(
  dataSourcesConfig.songRequest
);

export default getSongRequestsFromRoomInteractor;
