import dataSourcesConfig from '../../constants/data-sources.config';
import RegisteredUserEntity from '../../types/RegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError from '../../services/InteractorError';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => async (userId: string, user: RegisteredUserEntity): Promise<void> => {
  const updateCount = await registeredUserRepo.updateUser(userId, user);
  if (!updateCount) {
    throw new InteractorError(InteractorError.Codes.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.registeredUser);
