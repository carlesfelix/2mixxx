import IRegisteredUserEntity from '../../../core/entities/IRegisteredUserEntity';
import IRegisteredUserRepository from '../../../core/repositories/IRegisteredUserRepository';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class RegisteredUser implements IRegisteredUserRepository {
  async createUser(user: IRegisteredUserEntity): Promise<IRegisteredUserEntity> {
    const createdUser = await models.RegisteredUser.model.create(user);
    return instanceToJson<IRegisteredUserEntity>(createdUser) as IRegisteredUserEntity;
  }
  async updateUser(userId: string, user: IRegisteredUserEntity): Promise<number> {
    const [ updateNumber ] = await models.RegisteredUser.model.update(user, {
      where: { id: userId }, limit: 1
    });
    return updateNumber;
  }
  async getAllUsers(): Promise<IRegisteredUserEntity[]> {
    const users = await models.RegisteredUser.model.findAll();
    return instancesToJson<IRegisteredUserEntity>(users);
  }
  async deleteUser(userId: string): Promise<number> {
    const deleteCount = await models.RegisteredUser.model.destroy({
      where: { id: userId }, limit: 1
    });
    return deleteCount;
  }

  async getUserByEmail(email: string): Promise<IRegisteredUserEntity | null> {
    const user = await models.RegisteredUser.model.findOne({
      where: { email }, limit: 1
    });
    return instanceToJson<IRegisteredUserEntity>(user);
  }

}
