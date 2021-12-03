import { IdToken } from '@auth0/auth0-react';
import GuestToken from '../types/GuestToken';
import http from './http';

type SetRoomUserConfigProps = {
  tokenCb: () => GuestToken;
  unauthorizedCb: () => void;
};
export function setRoomUserConfigFn(props: SetRoomUserConfigProps): () => void {
  const { tokenCb, unauthorizedCb } = props;
  const handleAuthError = http.addResponseInterceptor(config => {
    return config;
  }, error => {
    if (http.isError(error) && error.response?.status === 401) {
      unauthorizedCb();
    }
    return Promise.reject(error);
  });
  const addTokenToRequest = http.addRequestInterceptor(config => {
    const token = tokenCb();
    config.headers['Authorization'] = `Bearer ${token.__raw}`;
    config.headers['user-type'] = 'roomUser';
    return config;
  });
  
  return () => {
    http.removeResponseInterceptor(handleAuthError);
    http.removeRequestInterceptor(addTokenToRequest);
  };
}

export function setRegisteredTokenFn(registeredTokenCb: () => Promise<IdToken>): () => void {
  const id = http.addRequestInterceptor(async config => {
    const token = await registeredTokenCb();
    config.headers['Authorization'] = `Bearer ${token.__raw}`;
    config.headers['user-type'] = 'registeredUser';
    return config;
  });
  return () => http.removeRequestInterceptor(id);
}
