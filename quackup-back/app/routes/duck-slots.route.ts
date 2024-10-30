import { Request, Response, Router } from 'express';
import { yup, validate } from 'libs/validation/yup';
import { isNotExistValueInDB, isExistValueInDB } from 'libs/validation/public';

import authenticate from 'middlewares/authenticate';
import controller from 'controllers/duck-slots.controller';

import { BuyParams, TapParams } from 'types/routes';
import { isValidCrossingDucks, isValidDeleteSlot } from 'libs/validation/business';

const router = Router();

router.get(
  '/list',
  authenticate,
  async (req: Request<never, never, BuyParams, never>, res: Response) => {
    const data = await controller.listSlots({ user: req.initTelegramData.user });
    res.send(data);
  }
);

router.post(
  '/crossing',
  authenticate,
  validate({
    body: yup.object({
      firstSlotId: yup
        .number()
        .required()
        .test('unique', 'Value is not exists', (value) => isExistValueInDB('slots', { id: value })),
      secondSlotId: yup
        .number()
        .required()
        .test('unique', 'Value is not exists', (value) => isExistValueInDB('slots', { id: value })),
    }),
  }),
  isValidCrossingDucks,
  async (req: Request<never, never, never, never>, res: Response) => {
    const { firstSlotId, secondSlotId } = req.body;

    const data = await controller.crossingDucks({
      user: req.initTelegramData.user,
      firstSlotId,
      secondSlotId,
    });
    res.send(data);
  }
);

router.delete(
  '/delete',
  authenticate,
  validate({
    body: yup.object({
      slotId: yup
        .number()
        .required()
        .test('unique', 'Value is not exists', (value) => isExistValueInDB('slots', { id: value })),
    }),
  }),
  isValidDeleteSlot,
  async (req: Request<never, never, never, never>, res: Response) => {
    const { slotId } = req.body;

    const data = await controller.deleteDuck({ user: req.initTelegramData.user, slotId });
    res.send(data);
  }
);

export default router;
