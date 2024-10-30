import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';

import { isNotExistValueInDB, isExistValueInDB } from 'libs/validation/public';
import { isValidBuyDuck } from 'libs/validation/business';

import authenticate from 'middlewares/authenticate';
import controller from 'controllers/duck-shop.controller';

import { BuyParams } from 'types/routes';

const router = Router();

router.post(
  '/buy',
  authenticate,
  validate({
    body: yup.object({
      id: yup
        .number()
        .required()
        .test('unique', 'Value is not exists', (value) => isExistValueInDB('ducks', { id: value })),
    }),
  }),
  isValidBuyDuck,
  async (req: Request<never, never, BuyParams, never>, res: Response) => {
    const { id } = req.body;

    const data = await controller.buyDuck({ id, user: req.initTelegramData.user });
    res.send(data);
  }
);

router.get(
  '/list',
  authenticate,
  async (req: Request<never, never, BuyParams, never>, res: Response) => {
    const data = await controller.listDucksShop({ user: req.initTelegramData.user });
    res.send(data);
  }
);

export default router;
