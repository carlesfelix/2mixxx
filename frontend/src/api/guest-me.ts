import { guestPermissions } from '../constants/permissions';
import GuestMe from '../types/GuestMe';

export async function getGuestMe(): Promise<GuestMe> {
  return {
    permissions: Object.values(guestPermissions)
  };
}
