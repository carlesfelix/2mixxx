import RegisteredUserEntity from '../types/RegisteredUserEntity';

export default interface IRegisteredUserRepository {
  createUser(user: RegisteredUserEntity): Promise<RegisteredUserEntity>;
  updateUserRole(userId: string, role: number): Promise<number>;
  getAllUsers(): Promise<RegisteredUserEntity[]>;
  deleteUser(userId: string): Promise<number>;
  getUserByEmail(email: string): Promise<RegisteredUserEntity | null>;
  getUserBySub(sub: string): Promise<RegisteredUserEntity | null>;
  getUserById(id: string): Promise<RegisteredUserEntity | null>;
}
