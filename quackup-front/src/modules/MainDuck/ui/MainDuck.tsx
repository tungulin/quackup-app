import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { useGesture } from '@use-gesture/react';
import { initHapticFeedback } from '@telegram-apps/sdk';

import { PlusOneItem } from '../type';
import PlusOne from '../components/PlusOne/PlusOne';

import { incrementBalance } from 'store/public/session';
import { tapDuckThunk } from 'store/public/session/thunk';
import { useAppDispatch, useAppSelector } from 'store';
import duckImg from 'ui/img/main-duck.png';

import styles from './MainDuck.module.css';

const hapticFeedback = initHapticFeedback();

export const MainDuck = () => {
  const dispatch = useAppDispatch();
  const [plusOnes, setPlusOnes] = useState<PlusOneItem[]>([]);
  const [idCounter, setIdCounter] = useState<number>(0);
  const [tappedBalance, setTappedBalance] = useState(0);
  let timerId = useRef<any>();

  const bind = useGesture({
    onTouchStart: ({ event }) => {
      initPlusCount(event);
      updateUserBalance();
    },
  });

  const initPlusCount = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    hapticFeedback.impactOccurred('medium');

    let clientX = event.touches[0].clientX;
    let clientY = event.touches[0].clientY;

    const position = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    const newId = idCounter + 1;
    setIdCounter(newId);
    setTappedBalance(tappedBalance + 1);

    setPlusOnes((prev) => [...prev, { id: newId, position }]);

    setTimeout(() => {
      setPlusOnes((prev) => prev.filter((item) => item.id !== newId));
    }, 1000);
  };

  useEffect(() => {
    if (tappedBalance !== 0) {
      clearTimeout(timerId.current);

      if (tappedBalance === 50) {
        dispatch(tapDuckThunk({ count: 50 })).then(() =>
          setTappedBalance((tappedBalance) => tappedBalance - 50)
        );
      }

      if (tappedBalance !== 50) {
        timerId.current = setTimeout(() => {
          dispatch(tapDuckThunk({ count: tappedBalance })).then(() => setTappedBalance(0));
        }, 400);
      }
    }
  }, [tappedBalance]);

  const updateUserBalance = () => dispatch(incrementBalance());

  return (
    <div className={styles.mainDuck}>
      <img src={duckImg} {...bind()} className={styles.duckIcon} />
      {plusOnes.map((item) => (
        <PlusOne key={item.id} {...item} />
      ))}
    </div>
  );
};
