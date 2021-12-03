import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';

const interactorFn = (
  registeredUserRepo: IRegisteredUserRepository
) => async (userId: string, role: number): Promise<void> => {
  const updateCount = await registeredUserRepo.updateUserRole(
    userId, role
  );
  if (!updateCount) {
    throw new InteractorError(InteractorErrorCodeEnum.ENTITY_NOT_FOUND);
  }
};
export default interactorFn(dataSourcesConfig.registeredUser);
