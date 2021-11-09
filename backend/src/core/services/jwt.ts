import { sign, verify, JwtPayload } from 'jsonwebtoken';

export function createToken(
  secret: string, payload: JwtPayload
): Promise<string> {
  return new Promise((resolve, reject) => {
    sign((payload), secret, function(err, token) {
      if (!err && token) {
        resolve(token);
      }
      reject(err);
    });
  });
}

export function verifyToken(secret: string, token: string): Promise<JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    verify(token, secret, function(err, payload) {
      if (!err) {
        resolve(payload);
      }
      reject(err);
    });
  });
}

export function getBearerToken(token: string): string | false {
  return token.startsWith('Bearer ') && token.replace('Bearer ', '');
}
