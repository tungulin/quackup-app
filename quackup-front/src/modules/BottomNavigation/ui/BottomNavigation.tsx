import styles from './BottomNavigation.module.css';

import ShopIcon from 'ui/icons/shop.svg';
import DucksIcon from 'ui/icons/ducks.svg';
// import LeagueIcon from 'ui/icons/league.svg';
// import FlyIcon from 'ui/icons/fly.svg';

import { useTranslation } from 'react-i18next';

import NavigationButton from '../components/NavigationButton';
import NavigationDuckButton from '../components/NavigationDuckButton';
import { useAppSelector } from '../../../store';

export const BottomNavigation = () => {
  const { t } = useTranslation();
  const isDraggingDuck = useAppSelector((state) => state.duckSlots.isDraggingDuck);

  if (isDraggingDuck) return <></>;

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__wrap}>
        <div style={{ width: 10, height: 10 }} />
        <NavigationButton name={t('bottomNavigation.shop')} icon={<ShopIcon />} path={'/shop'} />
        <NavigationDuckButton />
        <NavigationButton name={t('bottomNavigation.ducks')} icon={<DucksIcon />} path="/ducks" />
        <div style={{ width: 10, height: 10 }} />
      </div>
    </div>
  );
};
