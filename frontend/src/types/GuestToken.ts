export type GuestTokenPayload = {
  sub: string;
  exp: number;
  iat: number;
}

type GuestToken = {
  __raw: string;
} & GuestTokenPayload;

export default GuestToken;
