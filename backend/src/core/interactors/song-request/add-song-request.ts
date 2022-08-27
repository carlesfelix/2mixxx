import dataSourcesConfig from '../../constants/data-sources.config';
import transactionConfig from '../../constants/transaction.config';
import ITransaction from '../../interfaces/ITransaction';
import ISongRequestRepository from '../../repositories/ISongRequestRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import SongRequestEntity from '../../types/SongRequestEntity';
import { RoomUserAuth } from '../../types/UserAuth';

const addSongRequestInteractor = (
  songRequestRepo: ISongRequestRepository,
  transaction: ITransaction
) => async (
  songId: string,
  userAuth?: RoomUserAuth
): Promise<SongRequestEntity> => {
  if (userAuth && userAuth.type === 'roomUser') {
    const transactionInstance = await transaction.initialize();
    let songRequestsCount = 0;
    try {
      songRequestsCount = await songRequestRepo.getSongRequestsCountFromRoom(
        userAuth.roomId, transactionInstance
      );
    } catch {
      transaction.rollback();
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
    
    if (songRequestsCount > (25 - 1)) {
      transaction.rollback();
      throw new InteractorError(InteractorErrorCodeEnum.BAD_INPUT_DATA);
    }

    try {
      const data = await songRequestRepo.addSongRequest({
        roomId: userAuth.roomId,
        roomUserId: userAuth.id!,
        songId: songId
      }, transactionInstance);
      const songRequest = await songRequestRepo.getSongRequestById(
        data.id!,
        transactionInstance
      );
      if (!songRequest) {
        throw new Error();
      }
      transaction.commit();
      return songRequest;
    } catch {
      transaction.rollback();
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
  }
  throw new InteractorError(InteractorErrorCodeEnum.ACCESS_DENIED);
};
export default addSongRequestInteractor(
  dataSourcesConfig.songRequest,
  transactionConfig
);
