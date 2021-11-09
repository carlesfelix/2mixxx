import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRequestRepository from '../../repositories/ISongRequestRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import SongRequestEntity from '../../types/SongRequestEntity';
import UserAuth from '../../types/UserAuth';

const addSongRequestInteractor = (
  songRequestRepo: ISongRequestRepository
) => async (
  songId: string,
  userAuth?: UserAuth
): Promise<SongRequestEntity> => {
  if (userAuth && userAuth.type === 'roomUser') {
    const data = await songRequestRepo.addSongRequest({
      roomId: userAuth.user.roomId,
      roomUserId: userAuth.user.id!,
      songId: songId
    });
    const songRequest = await songRequestRepo.getSongRequestById(data.id!);
    if (!songRequest) {
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
    return songRequest;
  }
  throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
};
export default addSongRequestInteractor(dataSourcesConfig.songRequest);
