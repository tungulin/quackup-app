import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import toast from 'react-hot-toast';

import { deductBalance, updateProfitCoin } from 'store/public/session';
import { addDuckSlot } from 'store/public/slots';
import { getDuckShopListThunk, buyDuckThunk } from '../store/thunk';
import { DuckType } from '../type';

import ModalWrapper from 'components/ModalWrapper';
import DuckShopCard from 'components/DuckShopCard';
import { initHapticFeedback } from '@telegram-apps/sdk';

import styles from './DuckShop.module.css';
import { updateDuckShopList } from '../store';

const hapticFeedback = initHapticFeedback();

export const DuckShop = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { duckShopList } = useAppSelector((state) => state.duckShop);
  const user = useAppSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getDuckShopListThunk());
  }, []);

  const onClickBuyDuck = (id: number) => {
    const duck: any = duckShopList.find((duck: any) => duck.id === id);
    if (user.coinBalance < duck.price) {
      toast.error('Not enough coins to buy a duck');
      return;
    }
    toast.dismiss();

    dispatch(buyDuckThunk({ id }))
      .unwrap()
      .then((resp) => {
        toast.success('Duck bought');
        hapticFeedback.impactOccurred('light');
        dispatch(addDuckSlot(resp.slot));
        dispatch(deductBalance(duck.price));
        dispatch(updateProfitCoin(duck.profitPerMinute));

        if (resp.newDuckShop) {
          const copyDuckShopList = [...duckShopList].map((duckShop: any) => {
            if (duckShop.id === resp.newDuckShop.id) {
              duckShop = resp.newDuckShop;
            }
            return duckShop;
          });

          dispatch(updateDuckShopList(copyDuckShopList));
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Something went wrong...');
      });
  };

  const onClickClosePage = () => navigate('/');

  return (
    <ModalWrapper title="ducks" onClose={onClickClosePage}>
      <div className={styles.itemsWrap}>
        {duckShopList.map((duck: DuckType, key: number) => (
          <DuckShopCard key={key} duck={duck} onClickBuy={onClickBuyDuck} />
        ))}
      </div>
    </ModalWrapper>
  );
};
