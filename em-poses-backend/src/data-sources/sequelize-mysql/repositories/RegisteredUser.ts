import RegisteredUserEntity from '../../../core/types/RegisteredUserEntity';
import IRegisteredUserRepository from '../../../core/repositories/IRegisteredUserRepository';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class RegisteredUser implements IRegisteredUserRepository {
  async createUser(user: RegisteredUserEntity): Promise<RegisteredUserEntity> {
    const createdUser = await models.RegisteredUser.model.create(user);
    return instanceToJson<RegisteredUserEntity>(createdUser) as RegisteredUserEntity;
  }
  async updateUser(userId: string, user: RegisteredUserEntity): Promise<number> {
    const [ updateNumber ] = await models.RegisteredUser.model.update(user, {
      where: { id: userId }, limit: 1
    });
    return updateNumber;
  }
  async getAllUsers(): Promise<RegisteredUserEntity[]> {
    const users = await models.RegisteredUser.model.findAll();
    return instancesToJson<RegisteredUserEntity>(users);
  }
  async deleteUser(userId: string): Promise<number> {
    const deleteCount = await models.RegisteredUser.model.destroy({
      where: { id: userId }, limit: 1
    });
    return deleteCount;
  }

  async getUserByEmail(email: string): Promise<RegisteredUserEntity | null> {
    const user = await models.RegisteredUser.model.findOne({
      where: { email }, limit: 1
    });
    return instanceToJson<RegisteredUserEntity>(user);
  }

}
