import { createRoomUser } from '../api/room-users';
import { ROOM_USER_TOKEN_EXP_KEY, ROOM_USER_TOKEN_KEY } from '../constants/local-storage-keys';
import { decodeToken } from '../helpers/jwt';
import GuestToken, { GuestTokenPayload } from '../types/GuestToken';

let guestToken: GuestToken | null;
let expiresAtLocal = getTokenExpFromLocalStorage();

try {
  guestToken = getGuestTokenFromLocalStorage();
} catch {
  guestToken = null;
}

export function unregister() {
  guestToken = null;
  expiresAtLocal = 0;
  localStorage.removeItem(ROOM_USER_TOKEN_KEY);
  localStorage.removeItem(ROOM_USER_TOKEN_EXP_KEY);
}

export async function register(room: string): Promise<void> {
  const rawToken = await createRoomUser(room);
  const token = decodeToken<GuestTokenPayload>(rawToken);
  guestToken = token;
  localStorage.setItem(ROOM_USER_TOKEN_KEY, token.__raw);
  expiresAtLocal = getExpiresAtLocal(token);
  localStorage.setItem(ROOM_USER_TOKEN_EXP_KEY, expiresAtLocal.toString());
}

export function getGuestToken(): GuestToken {
  if (guestToken && isAuthenticated()) {
    return guestToken;
  }
  throw Error('User is not authenticated');
}

function getGuestTokenFromLocalStorage(): GuestToken | null {
  const localRawToken = localStorage.getItem(ROOM_USER_TOKEN_KEY);
  if (localRawToken) {
    return decodeToken<GuestTokenPayload>(localRawToken);
  }
  return null
}

function getTokenExpFromLocalStorage(): number {
  return +(localStorage.getItem(ROOM_USER_TOKEN_EXP_KEY) || 0);
}

function getExpiresAtLocal(token: GuestToken): number {
  const { exp, iat } = token;
  return ((exp - iat) * 1000) + Date.now();
}

function guestTokenExpired(): boolean {
  return expiresAtLocal < (Date.now() + 300000);
}

export function isAuthenticated() {
  return !!guestToken && !!expiresAtLocal && !guestTokenExpired();
}
