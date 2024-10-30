import { Link } from 'react-router-dom';
import styles from './NavigationDuckButton.module.css';
import { initHapticFeedback } from '@telegram-apps/sdk';

import generateDuckImg from 'ui/img/generate-duck.png';

import { useTranslation } from 'react-i18next';

const hapticFeedback = initHapticFeedback();

const NavigationDuckButton = () => {
  const { t } = useTranslation();
  const onClickNavigation = () => hapticFeedback.impactOccurred('soft');

  return (
    <Link onClick={onClickNavigation} to={'/'} className={styles.item__main}>
      <div className={styles.item__main__wrap}>
        <div className={styles.item__main__icon}>
          <img src={generateDuckImg} alt="" className={styles.imgStyle} />
        </div>
        <div className={styles.item__main__name}>{t('generate')}</div>
      </div>
    </Link>
  );
};

export default NavigationDuckButton;
