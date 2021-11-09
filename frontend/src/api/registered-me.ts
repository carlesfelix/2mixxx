import { registeredPermissions } from '../constants/permissions';
import RegisteredMe from '../types/RegisteredMe';

export async function getRegisteredMe(): Promise<RegisteredMe> {
  return {
    email: 'email@email.com',
    fullName: 'FullName',
    permissions: Object.values(registeredPermissions),
    picture: ''
  };
}
