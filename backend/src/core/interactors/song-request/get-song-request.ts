import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRequestRepository from '../../repositories/ISongRequestRepository';
import SongRequestEntity from '../../types/SongRequestEntity';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const getSongRequest = (
  songRequestRepo: ISongRequestRepository
) => async (songRequestId: string): Promise<SongRequestEntity> => {
  const data = await songRequestRepo.getSongRequestById(songRequestId);
  if (!data) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  return data;
}

const getSongRequestInteractor = getSongRequest(
  dataSourcesConfig.songRequest
);

export default getSongRequestInteractor;
