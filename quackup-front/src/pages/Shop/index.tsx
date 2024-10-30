import { lazy, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useBackButton } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';

//todo: add lazy
import { CoinShop } from 'modules/CoinShop';

import styles from './Shop.module.css';

const Shop = () => {
  const bb = useBackButton();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/shop',
      title: 'Duck-coin shop',
    });
  }, []);

  useEffect(() => {
    if (bb && bb.supports('show')) {
      bb.on('click', () => navigate('/'));
      if (!bb.isVisible) bb.show();
    }
  }, [bb]);

  return (
    <div className={styles.shop}>
      <CoinShop />
    </div>
  );
};

export default Shop;
