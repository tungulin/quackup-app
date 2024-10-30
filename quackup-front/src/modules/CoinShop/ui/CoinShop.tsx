import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getCoinShopListThunk } from '../store/thunk';

import ModalWrapper from 'components/ModalWrapper';
import CoinShopCard from 'components/CoinShopCard';
import duckDonation1 from 'ui/img/duck-shop1.png';
import duckDonation2 from 'ui/img/duck-shop2.png';
import duckDonation3 from 'ui/img/duck-shop3.png';
import duckDonation4 from 'ui/img/duck-shop4.png';
import duckDonation5 from 'ui/img/duck-shop5.png';
import duckDonation6 from 'ui/img/duck-shop6.png';

import { CoinShopType } from '../type';
import styles from './CoinShop.module.css';

const testData: CoinShopType[] = [
  {
    id: 1,
    name: 'Small Pack',
    image: duckDonation1,
    count: 300,
    price: 'Coming soon',
  },
  {
    id: 2,
    name: 'Small Pack',
    image: duckDonation2,
    count: 1600,
    price: 'Coming soon',
  },
  {
    id: 3,
    name: 'Small Pack',
    image: duckDonation3,
    count: 4000,
    price: 'Coming soon',
  },
  {
    id: 4,
    name: 'Small Pack',
    image: duckDonation4,
    count: 8200,
    price: 'Coming soon',
  },
  {
    id: 5,
    name: 'Small Pack',
    image: duckDonation5,
    count: 21000,
    price: 'Coming soon',
  },
  {
    id: 6,
    name: 'Small Pack',
    image: duckDonation6,
    count: 40000,
    price: 'Coming soon',
  },
];

export const CoinShop = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { coinShopList } = useAppSelector((state) => state.coinShop);
  const isProduction = process.env.REACT_APP_ENV === 'production';
  const data = testData;

  useEffect(() => {
    dispatch(getCoinShopListThunk());
  }, []);

  const onClickBuy = () => {
    console.log('onCickBuy');
  };

  const onClickClosePage = () => navigate('/');

  return (
    <ModalWrapper title="shop" onClose={onClickClosePage}>
      <div className={styles.coinShop}>
        {data.map((duck: CoinShopType, key) => (
          <CoinShopCard data={duck} onClickBuy={onClickBuy} key={key} />
        ))}
      </div>
    </ModalWrapper>
  );
};
