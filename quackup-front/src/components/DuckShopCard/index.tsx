import { useTranslation } from 'react-i18next';
import { classNames } from '@telegram-apps/sdk';
import disabledDuck from 'ui/img/disabled-duck.png';
import { useTimer } from 'react-timer-hook';

import { DuckType } from 'modules/DuckShop/type';

import styles from './DuckShopCard.module.css';
import { useAppDispatch, useAppSelector } from 'store';
import { updateDuckShopList } from 'modules/DuckShop/store';
import { useEffect } from 'react';

import RatingIcon from 'ui/icons/rating.svg';
import LockIcon from 'ui/icons/lock.svg';
import MonetaIcon from 'ui/icons/moneta-duck-small.svg';

import monetaDuckWebp from 'ui/webp/moneta-duck.webp';
import monetaDuckRedWebp from 'ui/webp/moneta-duck-red.webp';

interface ItemDucksProps {
  duck: DuckType;
  onClickBuy: (id: number) => void;
}

// todo: transfer this function to helpers
const formatPrice = (price: number) => {
  if (price < 1000) return price;
  if (price >= 1000 && price < 1_000_000) return (price / 1000).toFixed(2) + 'K';
  if (price >= 1_000_000) return (price / 1_000_000).toFixed(2) + 'M';
};

// todo: transfer this function to helpers
const formatTimer = (minutes: number, seconds: number) => {
  // return minutes >
  // const minutes =
};

// todo: rewrite
const DuckShopCard = ({ duck, onClickBuy }: ItemDucksProps) => {
  const dispatch = useAppDispatch();
  const { duckShopList } = useAppSelector((state) => state.duckShop);
  const { t } = useTranslation();
  const timer = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      let newDuckShopList = JSON.parse(JSON.stringify(duckShopList));
      newDuckShopList = newDuckShopList.map((duckShop: any) => {
        if (duckShop.id === duck.id) {
          duckShop.isLockByTime = false;
          duckShop.UTCLockTime = null;
        }
        return duckShop;
      });
      dispatch(updateDuckShopList(newDuckShopList));
    },
  });

  useEffect(() => {
    if (duck && duck.isLockByTime) {
      timer.restart(new Date(duck.UTCLockTime as string));
    }
  }, [duck]);

  return (
    <div
      className={classNames(styles.itemDuckCardWrap, {
        [styles.itemBorderBlock]: duck.isLock || duck.isLockByTime,
      })}
    >
      <div className={styles.itemDuckCardWrapLeft}>
        <img
          src={duck.isLock ? disabledDuck : duck.image}
          className={classNames(styles.imgStyle, {
            [styles.imgStyleBlock]: duck.isLockByTime,
          })}
          alt="duck"
        />
        <div
          className={classNames(styles.blockRating, {
            [styles.itemDuckBlock]: duck.isLock || duck.isLockByTime,
          })}
        >
          <RatingIcon />
          <span className={styles.ratingStyle}>{duck.level}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.farmSecStyle}>
          <span className={styles.textInfo}>{t('duckShop.farmSec')}</span>
          <div
            className={classNames(styles.farmInfo, {
              [styles.itemDuckBlock]: duck.isLock || duck.isLockByTime,
            })}
          >
            <span className={styles.farmDuck}>{duck.profitPerMinute}/M</span>
            <span className={styles.monetaDuck}>
              <MonetaIcon />
            </span>
          </div>
        </div>
        <div className={styles.farmSecStyle}>
          {!duck.isLock && <span>{t('duckShop.buy')}</span>}
          {duck.isLock && (
            <div className={styles.lockStyles}>
              <LockIcon />
            </div>
          )}

          {!duck.isLock && duck.isLockByTime && (
            <div className={styles.balanceInfoLock}>
              <span className={styles.sumDuckLockTime}>
                {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}:
                {timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
              </span>
            </div>
          )}

          {!duck.isLock && !duck.isLockByTime && (
            <div className={styles.balanceInfo} onClick={() => onClickBuy(duck.id)}>
              <span className={styles.sumDuck}>{formatPrice(duck.price)}</span>
              <span className={styles.monetaSumDuck}>
                {duck.isDonationPrice && (
                  <img src={monetaDuckRedWebp} style={{ width: 34, height: 34 }} alt="Image" />
                )}
                {!duck.isDonationPrice && (
                  <img src={monetaDuckWebp} style={{ width: 34, height: 34 }} alt="Image" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuckShopCard;
