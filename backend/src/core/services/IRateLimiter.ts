import RateLimiterResponse from '../types/RateLimiterResponse';

export default interface IRateLimiter {
  consume(key: string, points?: number): Promise<RateLimiterResponse>;
  get(key: string): Promise<RateLimiterResponse | null>;
}
