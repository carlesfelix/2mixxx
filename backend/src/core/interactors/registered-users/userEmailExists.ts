import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => async (email: string): Promise<{ exists: boolean }> => {
  const user = await registeredUserRepo.getUserByEmail(email);
  return { exists: !!user };
};
export default interactorFn(dataSourcesConfig.registeredUser);
