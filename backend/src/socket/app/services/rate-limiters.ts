import IRateLimiter from "../../../core/services/IRateLimiter";
import RateLimiter from "../../../core/services/RateLimiter";

export const generalRateLimiter: IRateLimiter = new RateLimiter({
  duration: 1,
  points: 100,
  keyPrefix: 'socket__general',
  blockDuration: 0
});
