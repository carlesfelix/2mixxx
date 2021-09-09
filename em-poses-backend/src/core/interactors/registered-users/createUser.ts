import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserEntity from '../../entities/IRegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => (user: IRegisteredUserEntity): Promise<IRegisteredUserEntity> => {
  return registeredUserRepo.createUser(user);
};
export default interactorFn(dataSourcesConfig.registeredUser);
