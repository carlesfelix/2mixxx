import RateLimiterResponse from "../types/RateLimiterResponse";
import IRateLimiter from "./IRateLimiter";
import { RateLimiterMemory } from 'rate-limiter-flexible';

export default class RateLimiter implements IRateLimiter {
  #rateLimiter: RateLimiterMemory;
  constructor(opts: {
    keyPrefix: string,
    points: number,
    duration: number,
    blockDuration: number;
  }) {
    this.#rateLimiter = new RateLimiterMemory({
      keyPrefix: opts.keyPrefix,
      points: opts.points,
      duration: opts.duration,
      blockDuration: opts.blockDuration
    });
  }
  async consume(
    key: string, points: number | undefined = 1
  ): Promise<RateLimiterResponse> {
    const res = await this.#rateLimiter.consume(key, points);
    return res.toJSON();
  }
  async get(key: string): Promise<RateLimiterResponse | null> {
    const res = await this.#rateLimiter.get(key);
    return res && res.toJSON();
  }

}
