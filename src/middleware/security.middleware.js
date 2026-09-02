import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    if (
      process.env.NODE_ENV === 'test' ||
      req.path === '/health' ||
      req.path === '/' ||
      req.path === '/api'
    ) {
      return next();
    }

    const role = req.user?.role || 'guest';

    let limit;

    switch (role) {
      case 'admin':
        limit = 50;
        break;
      case 'user':
        limit = 30;
        break;
      case 'guest':
        limit = 20;
        break;
      default:
        limit = 20;
    }

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      })
    );

    const decision = await client.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        logger.warn('Rate limit exceeded', {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          path: req.path,
        });

        return res
          .status(403)
          .json({ error: 'Forbidden', message: 'Too many requests' });
      }

      if (decision.reason.isShield()) {
        logger.warn('Shield Blocked request', {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          path: req.path,
          method: req.method,
        });

        return res.status(403).json({
          error: 'Forbidden',
          message: 'Request blocked by security policy',
        });
      }

      if (decision.reason.isBot()) {
        if (process.env.NODE_ENV === 'production') {
          logger.warn('Bot request blocked', {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            path: req.path,
          });

          return res.status(403).json({
            error: 'Forbidden',
            message: 'Automated requests are not allowed',
          });
        }

        // Ở môi trường dev, cho phép Postman / cURL / REST tools hoạt động
        return next();
      }

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by security policy',
      });
    }

    next();
  } catch (e) {
    console.error('Arcjet middleware error:', e);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong with security middleware',
    });
  }
};
export default securityMiddleware;
