import dataSourcesConfig from '../../constants/data-sources.config';
import RegisteredUserEntity from '../../types/RegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => async (userId: string, user: RegisteredUserEntity): Promise<void> => {
  const updateCount = await registeredUserRepo.updateUser(userId, user);
  if (!updateCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.registeredUser);
