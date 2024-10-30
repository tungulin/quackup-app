import { CoinShopType } from 'modules/CoinShop/type';

import styles from './CoinShopCard.module.css';

interface ItemDucksProps {
  data: CoinShopType;
  onClickBuy: (id: number) => void;
}

const CoinShopCard = ({ data, onClickBuy }: ItemDucksProps) => {
  const { name, count, image, id, price } = data;

  return (
    <div className={styles.wrap}>
      <div className={styles.name}>{name.toUpperCase()}</div>
      <div className={styles.content}>
        <p className={styles.price}>{count}</p>
        <img src={image} alt={name} className={styles.imgStyle} />
        {/*{isProduction*/}
        <div className={styles.comingSoonStylesBlock}>
          COMING SOON
        </div>
        {/*: <button className={styles.buyButton} onClick={() => onClickBuy(id)}>*/}
        {/*  ${price}*/}
        {/*</button>}*/}
      </div>
    </div>
  );
};

export default CoinShopCard;