import jwtDecode from 'jwt-decode';

export function decodeToken<T>(token: string): T & { __raw: string } {
  return {
    ...jwtDecode<T>(token),
    __raw: token
  };
}
