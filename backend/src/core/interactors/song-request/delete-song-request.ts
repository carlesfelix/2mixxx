import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRequestRepository from '../../repositories/ISongRequestRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const deleteSongRequestInteractorFn = (
  songRequestRepo: ISongRequestRepository
) => async (songRequestId: string): Promise<void> => {
  const deleteCount = await songRequestRepo.removeSongRequest(songRequestId);
  if (!deleteCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
}

const getSongRequestsFromRoomInteractor = deleteSongRequestInteractorFn(
  dataSourcesConfig.songRequest
);

export default getSongRequestsFromRoomInteractor;