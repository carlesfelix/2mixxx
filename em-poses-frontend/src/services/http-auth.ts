import { IdToken } from '@auth0/auth0-react';
import GuestToken from '../types/GuestToken';
import http from './http';

export function setGuestTokenFn(guestTokenCb: () => GuestToken | null): () => void {
  const id = http.addRequestInterceptor(config => {
    const token = guestTokenCb();
    if (token) {
      config.headers['Authorization'] = token.__raw;
      config.headers['Authorization-Type'] = 'Guest';
    }
    return config;
  });
  return () => http.removeRequestInterceptor(id);
}

export function setRegisteredTokenFn(registeredTokenCb: () => Promise<IdToken>): () => void {
  const id = http.addRequestInterceptor(async config => {
    const token = await registeredTokenCb();
    config.headers['Authorization'] = token.__raw;
    config.headers['Authorization-Type'] = 'Registered';
    return config;
  });
  return () => http.removeRequestInterceptor(id);
}
