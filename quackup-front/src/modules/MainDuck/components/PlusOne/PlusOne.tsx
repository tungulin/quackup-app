import React from 'react';
import { PlusOneItem } from '../../type';

import styles from './PlusOne.module.css';


const PlusOne = ({ position }: PlusOneItem) => (
  <div className={styles.plusOne} style={{ top: position.y, left: position.x }}>
    +1
  </div>
);

export default PlusOne;
