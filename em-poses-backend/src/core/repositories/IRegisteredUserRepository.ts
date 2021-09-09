import IRegisteredUserEntity from '../entities/IRegisteredUserEntity';

export default interface IRegisteredUserRepository {
  createUser(user: IRegisteredUserEntity): Promise<IRegisteredUserEntity>;
  updateUser(userId: string, user: IRegisteredUserEntity): Promise<number>;
  getAllUsers(): Promise<IRegisteredUserEntity[]>;
  deleteUser(userId: string): Promise<number>;
}
