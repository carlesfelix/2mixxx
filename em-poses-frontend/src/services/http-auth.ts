import { IdToken } from '@auth0/auth0-react';
import GuestToken from '../types/GuestToken';
import http from './http';

export function setGuestTokenFn(
  guestTokenCb: () => GuestToken
): () => void {
  const id = http.addRequestInterceptor(config => {
    const token = guestTokenCb();
    config.headers['Authorization'] = `Bearer ${token.__raw}`;
    config.headers['user-type'] = 'roomUser';
    return config;
  });
  return () => http.removeRequestInterceptor(id);
}

export function setRegisteredTokenFn(registeredTokenCb: () => Promise<IdToken>): () => void {
  const id = http.addRequestInterceptor(async config => {
    const token = await registeredTokenCb();
    config.headers['Authorization'] = `Bearer ${token.__raw}`;
    // config.headers['user-type'] = 'registeredUser';
    return config;
  });
  return () => http.removeRequestInterceptor(id);
}
