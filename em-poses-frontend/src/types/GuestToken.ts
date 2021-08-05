type GuestToken = {
  __raw: string;
  userId: string;
  room: string;
  exp: number;
  iat: number;
};

export default GuestToken;
