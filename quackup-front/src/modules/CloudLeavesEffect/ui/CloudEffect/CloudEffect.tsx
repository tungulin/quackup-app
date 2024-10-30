import { classNames } from '@telegram-apps/sdk';
import sky1 from 'ui/webp/sky-1.webp';
import sky2 from 'ui/webp/sky-2.webp';
import sky3 from 'ui/webp/sky-3.webp';
import leafImg from 'ui/img/leaf.png';

import styles from './CloudEffect.module.css';

const clouds = [
  { src: sky1, classes: [styles.cloud, styles.cloud1] },
  { src: sky2, classes: [styles.cloud, styles.cloud2] },
  { src: sky3, classes: [styles.cloud, styles.cloud3] },
  { src: sky3, classes: [styles.cloud, styles.cloud4] },
  { src: sky1, classes: [styles.cloud, styles.cloud5] },
  { src: sky1, classes: [styles.cloud, styles.cloud6] },
];

const balls = Array.from({ length: 13 }, (_, index) => ({
  src: leafImg,
  classes: [styles.list, styles[`ball${index + 1}`]],
}));

export const CloudEffect = () => {
  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__elements}>
        {clouds.map((cloud, index) => (
          <div key={index} className={classNames(...cloud.classes)}>
            <img src={cloud.src} alt="Image" />
          </div>
        ))}
      </div>
      <div className={classNames(styles.appContent, styles.appContentSlider, styles.swiper)}>
        <div className={classNames(styles.appContent__wrapper, styles.swiperWrapper)}>
          <div className={classNames(styles.appMain, styles.appPage, styles.swiperSlide)} id="appMain">
            <div className={classNames(styles.app__ui)}>
              <div className={styles.app__clouds}>
                {balls.map((ball, index) => (
                  <div key={index} className={styles.list}>
                    <img src={ball.src} className={classNames(...ball.classes)} alt="Image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
