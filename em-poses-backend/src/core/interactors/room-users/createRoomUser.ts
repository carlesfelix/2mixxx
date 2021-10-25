import environment from '../../../environment';
import dataSourcesConfig from '../../constants/data-sources.config';
import IRoomsRepository from '../../repositories/IRoomsRepository';
import IRoomUserRepository from '../../repositories/IRoomUserRepository';
import InteractorError from '../../services/InteractorError';
import { createToken } from '../../services/jwt';

type Repositories = {
  roomUserRepo: IRoomUserRepository;
  roomRepo: IRoomsRepository;
}
const interactorFn = (repositories: Repositories) => async (roomCode: string): Promise<string> => {
  const { roomUserRepo, roomRepo } = repositories;
  const room = await roomRepo.getRoomByCode(roomCode);
  if (!room || !room.id) {
    throw new InteractorError(InteractorError.Codes.UNAUTHORIZED);
  }
  const { id: roomUserId } = await roomUserRepo.createUser(room.id);
  const token = await createToken(
    environment.JWT_ROOM_USERS_SECRET,
    {
      sub: roomUserId,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }
  );
  return token;
};
const createRoomUser = interactorFn({
  roomUserRepo: dataSourcesConfig.roomUser,
  roomRepo: dataSourcesConfig.room
});
export default createRoomUser;
