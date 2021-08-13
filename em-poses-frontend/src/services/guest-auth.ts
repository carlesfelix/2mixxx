import { registerGuestUser } from '../api/guest-users';
import { GUEST_TOKEN_KEY } from '../constants/local-storage-keys';
import { decodeToken } from '../helpers/jwt';
import GuestToken, { GuestTokenPayload } from '../types/GuestToken';

let guestToken: GuestToken | null;
let expiresAtLocal = 0;

try {
  guestToken = getGuestTokenFromLocalStorage();
  if (guestToken) {
    expiresAtLocal = getExpiresAtLocal(guestToken);
  }
} catch {
  guestToken = null;
}

export function unregister() {
  guestToken = null;
  expiresAtLocal = 0;
  localStorage.removeItem(GUEST_TOKEN_KEY);
}

export async function register(room: string): Promise<void> {
  const rawToken = await registerGuestUser(room);
  const token = decodeToken<GuestTokenPayload>(rawToken);
  updateToken(token);
}

export function getGuestToken(): GuestToken | null {
  return guestToken;
}

function getGuestTokenFromLocalStorage(): GuestToken | null {
  const localRawToken = localStorage.getItem(GUEST_TOKEN_KEY);
  if (localRawToken) {
    return decodeToken<GuestTokenPayload>(localRawToken);
  }
  return null
}

function getExpiresAtLocal(token: GuestToken): number {
  const { exp, iat } = token;
  return ((exp - iat) * 1000) + Date.now();
}

function updateToken(token: GuestToken): void {
  guestToken = token;
  localStorage.setItem(GUEST_TOKEN_KEY, token.__raw);
  expiresAtLocal = getExpiresAtLocal(token);
}

function guestTokenExpired(): boolean {
  return expiresAtLocal < (Date.now() + 300000);
}

export function isAuthenticated() {
  return !!guestToken && !!expiresAtLocal && !guestTokenExpired();
}
