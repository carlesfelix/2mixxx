import { NextFunction, Request, Response } from 'express';
import IRateLimiter from '../../../core/services/IRateLimiter';
import RateLimiterResponse from '../../../core/types/RateLimiterResponse';
import { AnyUserAuth } from '../../../core/types/UserAuth';
import ApiError, { StatusCodeEnum } from '../services/ApiError';

export function rateLimiterMid(rateLimiter: IRateLimiter, points: number): (
  req: Request,
  res: Response<unknown, {auth?: AnyUserAuth}>,
  next: NextFunction
) => void {
  return (req, res, next) => {
    function updateHeaders(rateLimiterRes: RateLimiterResponse): void {
      res.set('Retry-After', (rateLimiterRes.msBeforeNext / 1000).toString());
      res.set('X-RateLimit-Limit', points.toString());
      res.set(
        'X-RateLimit-Remaining',
        rateLimiterRes.remainingPoints.toString()
      );
      res.set(
        'X-RateLimit-Reset',
        (new Date(Date.now() + rateLimiterRes.msBeforeNext)).toISOString()
      );
    }
    const key = res.locals.auth ?
      `user|${res.locals.auth.type}|${res.locals.auth.id}` :
      `ip|${req.ip}`;

    rateLimiter.consume(key, points).then(rateLimiterRes => {
      updateHeaders(rateLimiterRes);
      next();
    }).catch((rateLimiterRes: RateLimiterResponse) => {
      updateHeaders(rateLimiterRes);
      next(new ApiError(StatusCodeEnum.TooManyRequests));
    });
  };
}
