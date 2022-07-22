import { sign, verify, JwtPayload } from 'jsonwebtoken';
import jwksAuth0Client from '../constants/jwks-auth0-client';

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

export function verifyToken(secret: string, token: string): Promise<string | JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    verify(token, secret, function(err, payload) {
      if (!err) {
        resolve(payload);
      }
      reject(err);
    });
  });
}

export function verifyAuth0Token(token: string): Promise<string | JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    function getKey(
      header: { kid?: string },
      callback: (error: Error | null, signingKey: string) => void
    ): void {
      jwksAuth0Client.getSigningKey(header.kid, function(err, key) {
        if (err) {
          callback(err, '');
          return;
        }
        const signingKey = key ? key.getPublicKey() : '';
        callback(err, signingKey);
      });
    }
    verify(token, getKey, {}, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded);
      }
    });
  });
}

export function getBearerToken(token: string): string | false {
  return token.startsWith('Bearer ') && token.replace('Bearer ', '');
}
