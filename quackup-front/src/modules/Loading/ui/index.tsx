import React, { useState, MouseEvent, useEffect } from 'react';
import { useGesture } from '@use-gesture/react';
import logoImg from 'ui/webp/logo-quack-up.webp';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

import { RootState, useAppDispatch, useAppSelector } from 'store';

import styles from './ui.module.css';
import { setClickOnLoadingButton } from '../store';

export const Loading = () => {
  const dispatch = useAppDispatch();
  const [tgVersion, setTgVersion] = useState('');
  const { isLoading } = useAppSelector((state) => state.loading);

  useEffect(() => {
    const lp = retrieveLaunchParams();
    setTgVersion(lp.version);
  }, []);

  const onClickLoadingButton = () => dispatch(setClickOnLoadingButton(true));

  return (
    <div className={styles.loading}>
      <div className={styles.loadingCenter}>
        <img className={styles.loadingCenterImg} src={logoImg} />
        {!isLoading && (
          <button onClick={onClickLoadingButton} className={styles.button}>
            Start
          </button>
        )}
      </div>
      {tgVersion && <div className={styles.tgVersion}>v.{tgVersion}</div>}
    </div>
  );
};
