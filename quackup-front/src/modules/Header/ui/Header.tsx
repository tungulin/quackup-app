import Balance from '../components/Balance';
import UserInfo from '../components/UserInfo';

import styles from './Header.module.css';

export const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.header__wrap}>
        <UserInfo />
        <Balance />
      </div>
    </div>
  );
};
