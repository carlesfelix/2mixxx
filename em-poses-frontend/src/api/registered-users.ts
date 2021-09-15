import http from '../services/http';
import RegisteredUser from '../types/RegisteredUser';

export async function createUser(user: RegisteredUser): Promise<RegisteredUser> {
  const { data } = await http.post<RegisteredUser>('/registered-users', user);
  return data;
}

export async function deleteUser(userId: string): Promise<void> {
  await http.delete<void>(`/registered-users/${userId}`);
}

export async function getAllUsers(): Promise<RegisteredUser[]> {
  const { data } = await http.get<RegisteredUser[]>('/registered-users');
  return data;
}

export async function updateUser(user: RegisteredUser): Promise<void> {
  await http.post<void>(`/registered-users/${user.id!}`, user);
}
