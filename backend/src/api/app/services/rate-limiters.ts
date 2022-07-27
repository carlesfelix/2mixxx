import IRateLimiter from "../../../core/services/IRateLimiter";
import RateLimiter from "../../../core/services/RateLimiter";

export const generalRateLimiter: IRateLimiter = new RateLimiter({
  duration: 1,
  points: 100,
  keyPrefix: 'api__general',
  blockDuration: 0
});

export const checkRoomRateLimiter: IRateLimiter = new RateLimiter({
  duration: 8,
  points: 100,
  keyPrefix: 'api__checkRoom',
  blockDuration: 60 * 5
});

export const createRoomUserRateLimiter: IRateLimiter = new RateLimiter({
  duration: 1,
  points: 100,
  keyPrefix: 'api__createRoomUser',
  blockDuration: 60 * 5
});
