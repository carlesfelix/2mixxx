export type GuestTokenPayload = {
  userId: string;
  room: string;
  exp: number;
  iat: number;
}

type GuestToken = {
  __raw: string;
} & GuestTokenPayload;

export default GuestToken;
