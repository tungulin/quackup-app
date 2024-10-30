import { Routes, Route } from 'react-router-dom';

import MainPage from './Main';
import DucksPage from './Ducks';
import ShopPage from './Shop';

import { Header } from 'modules/Header';
import { BottomNavigation } from 'modules/BottomNavigation';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import i18 from 'localization';
import toast from 'react-hot-toast';

import { initializeUserThunk } from 'store/public/session/thunk';
import { getDuckSlotsListThunk } from 'store/public/slots/thunk';
import { addBalance } from 'store/public/session';

import { setLoading } from 'modules/Loading/store';

// prettier-ignore
import {initMiniApp, initViewport,initSwipeBehavior, retrieveLaunchParams } from '@telegram-apps/sdk';
import { OnlyMobile } from 'modules/OnlyMobile';
import { Loading } from 'modules/Loading';
import { CloudEffect } from 'modules/CloudLeavesEffect';
import ReactGA from 'react-ga4';

const [viewport] = initViewport();
const [miniApp] = initMiniApp();
const [swipeBehavior] = initSwipeBehavior();

const Routing = () => {
  const dispatch = useAppDispatch();
  const { isClickOnLoadingButton } = useAppSelector((state) => state.loading);
  const user = useAppSelector((state) => state.session.user);
  const [isDesktop, setIsDesktop] = useState(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    expandView().then(() => disableVerticalSwipe());

    if (process.env.REACT_APP_GOOGLE_TRACK_ID) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACK_ID as string);
    }

    i18.changeLanguage('eng');
    initUser();
    checkIsDesktop();
  }, []);

  useEffect(() => {
    if (user.telegramId) {
      startClaimProfitCoins();
    }

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [user]);

  const disableVerticalSwipe = () => {
    const isSupportDisableVerticalSwipe = swipeBehavior.supports('disableVerticalSwipe');
    console.log('isSupportDisableVerticalSwipe', isSupportDisableVerticalSwipe);

    if (isSupportDisableVerticalSwipe) {
      swipeBehavior.disableVerticalSwipe();
    }

    // if (!isSupportDisableVerticalSwipe) {
    // todo: add
    // }

    miniApp.ready();
  };

  const expandView = () => {
    return viewport.then((vp) => {
      if (!vp.isExpanded) {
        vp.expand();
      }
    });
  };

  const initUser = () => {
    dispatch(initializeUserThunk())
      .unwrap()
      .then(() => dispatch(getDuckSlotsListThunk()).unwrap())
      .then(() => dispatch(setLoading(false)))
      .catch(() => toast.error('Something went wrong...'));
  };

  const startClaimProfitCoins = () => {
    const id = setInterval(() => {
      dispatch(addBalance(user.profitCoinPerMinute));
    }, 60000);

    intervalIdRef.current = id;
  };

  const checkIsDesktop = () => {
    const lp = retrieveLaunchParams();

    if (['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(lp.platform)) {
      setIsDesktop(true);
      return;
    }
  };

  if (isDesktop && process.env.REACT_APP_ENV === 'production') return <OnlyMobile />;
  if (!isClickOnLoadingButton) return <Loading />;

  return (
    <>
      <Header />
      <CloudEffect />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ducks" element={<DucksPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
      <BottomNavigation />
    </>
  );
};

export default Routing;
