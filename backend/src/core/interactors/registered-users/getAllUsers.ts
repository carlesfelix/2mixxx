import dataSourcesConfig from '../../constants/data-sources.config';
import RegisteredUserEntity from '../../types/RegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => (): Promise<RegisteredUserEntity[]> => {
  return registeredUserRepo.getAllUsers();
};
export default interactorFn(dataSourcesConfig.registeredUser);
