type RateLimiterResponse = {
  remainingPoints: number;
  msBeforeNext: number;
  consumedPoints: number;
  isFirstInDuration: boolean;
};

export default RateLimiterResponse;
