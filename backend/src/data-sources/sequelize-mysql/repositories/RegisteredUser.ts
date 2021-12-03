import IRegisteredUserRepository from '../../../core/repositories/IRegisteredUserRepository';
import RegisteredUserEntity from '../../../core/types/RegisteredUserEntity';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class RegisteredUser implements IRegisteredUserRepository {
  async getUserById(id: string): Promise<RegisteredUserEntity | null> {
    const user = await models.RegisteredUser.model.findOne({
      where: { id }, limit: 1
    });
    return instanceToJson<RegisteredUserEntity>(user);
  }
  async getUserBySub(sub: string): Promise<RegisteredUserEntity | null> {
    const user = await models.RegisteredUser.model.findOne({
      where: { sub }, limit: 1
    });
    return instanceToJson<RegisteredUserEntity>(user);
  }
  async createUser(user: RegisteredUserEntity): Promise<RegisteredUserEntity> {
    const createdUser = await models.RegisteredUser.model.create(user);
    return instanceToJson<RegisteredUserEntity>(createdUser) as RegisteredUserEntity;
  }
  async updateUserRole(userId: string, role: number): Promise<number> {
    const [ updateNumber ] = await models.RegisteredUser.model.update(
      { role },
      {
        where: { id: userId }, limit: 1,
        fields: ['role']
      }
    );
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
