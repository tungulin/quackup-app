import { rateLimit } from 'express-rate-limit';

const limiter = ({ windowMs, limit }: { windowMs: number; limit: number }) =>
  rateLimit({
    windowMs,
    limit,
    message: {
      type: 'RATE_LIMIT',
      message: 'Too many requests, please try again later',
    },
    validate: {
      xForwardedForHeader: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

export default limiter;
