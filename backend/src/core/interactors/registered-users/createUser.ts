import environment from '../../../environment';
import auth0ManagementClient from '../../constants/auth0-management-client';
import dataSourcesConfig from '../../constants/data-sources.config';
import IRegisteredUserRepository from '../../repositories/IRegisteredUserRepository';
import InteractorError, { InteractorErrorCodeEnum } from '../../services/InteractorError';
import RegisteredUserEntity from '../../types/RegisteredUserEntity';

const interactorFn = (
  registeredUserRepo: IRegisteredUserRepository
) => async (
  user: { email: string, role: number, password: string }
): Promise<RegisteredUserEntity> => {
  const { email, role, password } = user;
  try {
    const auth0User = await auth0ManagementClient.createUser({
      connection: environment.AUTH0_DB_CONNECTION,
      email, verify_email: false, email_verified: true,
      password
    });
    const { user_id: sub } = auth0User;
    if (!sub) {
      throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
    }
    const registeredUser = await registeredUserRepo.createUser({
      email, role, sub
    });
    return registeredUser;
  } catch (error) {
    if (error instanceof Error && error.name === 'Bad Request') {
      throw new InteractorError(
        InteractorErrorCodeEnum.BAD_INPUT_DATA,
        error.message
      );
    }
    throw new InteractorError(InteractorErrorCodeEnum.GENERIC);
  }
};
export default interactorFn(dataSourcesConfig.registeredUser);
