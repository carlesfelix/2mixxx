import auth0ManagementClient from '../../constants/auth0-management-client';
import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (
  registeredUserRepo: IRegisteredUserRepository
) => async (userId: string): Promise<void> => {
  const registeredUser = await registeredUserRepo.getUserById(userId);
  if (!registeredUser) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
  await auth0ManagementClient.deleteUser({ id: registeredUser.sub! });
  const deleteCount = await registeredUserRepo.deleteUser(userId);
  if (!deleteCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.registeredUser);
