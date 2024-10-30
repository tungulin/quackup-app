import { FC, lazy, ReactElement, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { initHapticFeedback } from '@telegram-apps/sdk';

import styles from './NavigationButton.module.css';
import { classNames } from '@telegram-apps/sdk';

interface INavigationButtonProps {
  icon: ReactElement;
  name: string;
  path: string;
  disabled?: boolean;
}

const hapticFeedback = initHapticFeedback();

const NavigationButton: FC<INavigationButtonProps> = ({ icon, name, path, disabled }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const onClickNavigation = () => {
    hapticFeedback.impactOccurred('soft');
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Link onClick={onClickNavigation} to={path} className={styles.item}>
      <div className={styles.item__wrap}>
        <div className={classNames(styles.item__icon, {
          [styles.animate]: isAnimating,
          [styles.itemIconDisabled]: disabled,
        })}>
          {icon}
        </div>
        <div className={styles.item__name}>{name}</div>
      </div>
    </Link>
  );
};

export default NavigationButton;
