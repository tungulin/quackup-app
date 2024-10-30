import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';
import { isNotExistValueInDB, isExistValueInDB } from 'libs/validation/public';

import authenticate from 'middlewares/authenticate';
import controller from 'controllers/donation-shop.controller';

import { BuyParams } from 'types/routes';

const router = Router();

router.get(
  '/list',
  authenticate,
  async (req: Request<never, never, BuyParams, never>, res: Response) => {
    const data = await controller.listDonationShop();
    res.send(data);
  }
);

export default router;
