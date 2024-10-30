import { lazy, useEffect } from 'react';
import { useBackButton } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';

import { DuckShop } from 'modules/DuckShop';
import ReactGA from 'react-ga4';

import styles from './Ducks.module.css';

const Ducks = () => {
  const bb = useBackButton();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/fly',
      title: 'Fly',
    });
  }, []);

  useEffect(() => {
    if (bb && bb.supports('show')) {
      bb.on('click', () => navigate('/'));
      if (!bb.isVisible) bb.show();
    }
  }, [bb]);

  return (
    <div className={styles.ducks}>
      <DuckShop />
    </div>
  );
};

export default Ducks;
