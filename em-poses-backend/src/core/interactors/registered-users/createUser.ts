import dataSourcesConfig from '../../constants/data-sources.config';
import RegisteredUserEntity from '../../types/RegisteredUserEntity';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';

const interactorFn = (registeredUserRepo: IRegisteredUserRepository) => (user: RegisteredUserEntity): Promise<RegisteredUserEntity> => {
  return registeredUserRepo.createUser(user);
};
export default interactorFn(dataSourcesConfig.registeredUser);
