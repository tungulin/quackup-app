import React, { useState, MouseEvent } from 'react';
import DuckIcon from 'ui/icons/main-duck.svg';
import { useGesture } from '@use-gesture/react';

import { RootState, useAppDispatch, useAppSelector } from 'store';

import styles from './OnlyMobile.module.css';

export const OnlyMobile = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.onlyMobile}>
      OnlyMobile
    </div>
  );
};
