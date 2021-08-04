export interface IGuestToken {
  __raw: string;
  userId: string;
  room: string;
  exp: number;
  iat: number;
}
