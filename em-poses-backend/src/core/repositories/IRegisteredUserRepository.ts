import RegisteredUserEntity from '../types/RegisteredUserEntity';

export default interface IRegisteredUserRepository {
  createUser(user: RegisteredUserEntity): Promise<RegisteredUserEntity>;
  updateUser(userId: string, user: RegisteredUserEntity): Promise<number>;
  getAllUsers(): Promise<RegisteredUserEntity[]>;
  deleteUser(userId: string): Promise<number>;
  getUserByEmail(email: string): Promise<RegisteredUserEntity | null>;
}
