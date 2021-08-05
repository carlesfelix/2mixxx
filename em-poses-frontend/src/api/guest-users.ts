import GuestToken from '../types/GuestToken';

export async function registerGuestUser(room: string): Promise<GuestToken> {
  return new Promise(resolve => {
    const ts = Date.now();
    setTimeout(() => {
      resolve({
        __raw: 'ey.............',
        exp: ts + (60 * 60 * 1000 * 12),
        iat: ts,
        room,
        userId: '973e956a-d06a-4986-88ae-7beac4496eda'
      });
    }, 1000);
  });
}
