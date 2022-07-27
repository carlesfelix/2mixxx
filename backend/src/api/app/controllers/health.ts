import { Request, Response } from 'express';

export function getApiHealthCtrl(
  req: Request,
  res: Response
): void {
  res.status(200).json({
    msg: 'Api works!',
    rateLimiterKey: req.ip
  });
}
