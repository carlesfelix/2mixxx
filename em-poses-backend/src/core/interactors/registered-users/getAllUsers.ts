import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserEntity from '../../entities/IRegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => (): Promise<IRegisteredUserEntity[]> => {
  return registeredUserRepo.getAllUsers();
};
export default interactorFn(dataSourcesConfig.registeredUser);
