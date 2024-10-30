import { MainDuck } from 'modules/MainDuck';
import { DuckSlots } from 'modules/DuckSlots';
import ReactGA from 'react-ga4';
import { initHapticFeedback } from '@telegram-apps/sdk';

import { DuckLevel } from 'modules/DuckLevel';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import ModalBottomClaim from './components/ModalBottomClaim';
import { toggleClaimModal } from 'store/public/session';

import styles from './Main.module.css';
import { useBackButton } from '@telegram-apps/sdk-react';

const hapticFeedback = initHapticFeedback();

const Main = () => {
  const { isClaimModalOpen } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();
  const bb = useBackButton();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/',
      title: 'Main',
    });
  }, []);

  useEffect(() => {
    if (bb && bb.supports('hide') && bb.isVisible) {
      bb.hide();
    }
  }, [bb]);

  const onCloseModalClaim = () => {
    hapticFeedback.notificationOccurred('success');
    dispatch(toggleClaimModal(false));
  };

  return (
    <div className={styles.main}>
      <MainDuck />
      <DuckLevel />
      <DuckSlots />
      <ModalBottomClaim isOpen={isClaimModalOpen} onClose={onCloseModalClaim} />
    </div>
  );
};

export default Main;
