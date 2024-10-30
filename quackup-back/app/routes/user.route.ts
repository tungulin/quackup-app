import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import authenticate from 'middlewares/authenticate';
import controller from 'controllers/user.contoller';
import limiter from 'middlewares/limiter';

import { SignInParams, TapParams } from 'types/routes';

const router = Router();

router.post(
  '/initialize',
  authenticate,
  async (req: Request<never, never, never, never>, res: Response) => {
    const userDB = await controller.initUser(req.initTelegramData);
    res.send(userDB);
  }
);

router.post(
  '/tap',
  limiter({ windowMs: 850, limit: 2 }),
  authenticate,
  validate({
    body: yup.object({
      count: yup.number().max(60).required(),
    }),
  }),
  async (req: Request<never, never, TapParams, never>, res: Response) => {
    const { count } = req.body;
    const data = await controller.tapDuck({ count, user: req.initTelegramData.user });
    res.send(data);
  }
);

export default router;
