import { Request, Response, NextFunction } from 'express';
import { validate, parse, type InitDataParsed } from '@telegram-apps/init-data-node';

const authenticate = (req: any, res: Response, next: NextFunction) => {
  try {
    let token = req.headers?.['authorization'];

    if (!token) {
      throw new Error('Token is not provided');
    }

    const [authType, authData = ''] = (token || '').split(' ');

    if (authType === 'tma') {
      validate(authData, process.env.BOT_TOKEN as string, { expiresIn: 0 });
      const initData = parse(authData);

      if (!initData.user) {
        throw new Error('Token is not avaliable. User not found');
      }

      req.initTelegramData = initData;
      next();
    }
  } catch (error: any) {
    return res.status(401).send({
      type: 'JWTTokenError',
      message: error.message || error,
    });
  }
};

export default authenticate;
