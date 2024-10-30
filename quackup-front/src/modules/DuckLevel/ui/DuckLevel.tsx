import { useAppSelector } from 'store';
import styles from './DuckLevel.module.css';

const testData = {
  level: 1,
  currentXP: 1,
  maxXP: 5000,
  xpPerSecond: 0,
};

export const DuckLevel = () => {
  const { level, currentXP, maxXP, xpPerSecond } = testData;
  const user = useAppSelector((state) => state.session.user);

  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <div className={styles.duckLevel}>
      <span className={styles.level}>{level}</span>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progressPercentage}%` }}>
          <div className={styles.indicator}></div>
        </div>
        <span className={styles.xpPerSecond}>{user.profitCoinPerMinute}/m</span>
      </div>
    </div>
  );
};
