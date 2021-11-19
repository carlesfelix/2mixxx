import dataSourcesConfig from '../../constants/data-sources.config';
import ISongRequestRepository from '../../repositories/ISongRequestRepository';
import SongRequestEntity from '../../types/SongRequestEntity';

const getSongRequestsFromRoomInteractorFn = (
  songRequestRepo: ISongRequestRepository
) => async (roomId: string): Promise<SongRequestEntity[]> => {
  const data = await songRequestRepo.getSongRequestsFromRoom(roomId);
  return data;
}

const getSongRequestsFromRoomInteractor = getSongRequestsFromRoomInteractorFn(
  dataSourcesConfig.songRequest
);

export default getSongRequestsFromRoomInteractor;
