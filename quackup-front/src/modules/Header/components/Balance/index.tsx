import { useAppSelector } from 'store';
import MonetaIcon from 'ui/icons/moneta-duck.svg';
import DuckDonationIcon from 'ui/icons/duck-donation-small.svg';
import PlusDonationIcon from 'ui/icons/button-plus-donation.svg';

import styles from './Balance.module.css';
import { Route, useNavigate } from 'react-router-dom';

// todo: transfer this fucntion to helpers
const formatPrice = (price: number) => {
  if (price < 1000) return price;
  if (price >= 1000 && price < 1_000_000) return (price / 1000).toFixed(2) + 'K';
  if (price >= 1_000_000) return (price / 1_000_000).toFixed(2) + 'M';
};

const Balance = () => {
  const user = useAppSelector((state) => state.session.user);
  const navigate = useNavigate();

  const handleClick = () => navigate('/shop');

  return (
    <div className={styles.balance}>
      <div className={styles.coinBalance}>
        <div className={styles.coinIcon}>
          <MonetaIcon />
        </div>
        <span className={styles.coinBalanceValue}>{formatPrice(user.coinBalance)}</span>
      </div>
      <div className={styles.coinBalance}>
        <div className={styles.coinIcon}>
          <DuckDonationIcon />
          <PlusDonationIcon className={styles.valuePlusIcon} onClick={handleClick} />
        </div>
        <span className={styles.value}>{user.coinDuckBalance}</span>
      </div>
    </div>
  );
};

export default Balance;
