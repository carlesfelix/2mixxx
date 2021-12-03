import http from '../services/http';
import RegisteredUser from '../types/RegisteredUser';
import UserForm from '../types/UserForm';

export async function createUser(user: UserForm): Promise<RegisteredUser> {
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

export async function updateUserRole(userId: string, role: number): Promise<void> {
  await http.put<void>(`/registered-users/${userId}/role`, {
    role
  });
}

export async function userEmailExists(email: string): Promise<{ exists: boolean }> {
  const { data } = await http.get<{ exists: boolean }>('/registered-users/exists', { params: { email } });
  return data;
}
