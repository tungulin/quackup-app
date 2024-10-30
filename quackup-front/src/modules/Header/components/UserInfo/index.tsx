import MuteIcon from 'ui/icons/mute.svg';
import UnMuteIcon from 'ui/icons/un-mute.svg';
import TelegramIcon from 'ui/icons/telegram-icon.svg';

import styles from './UserInfo.module.css';
import { useAppDispatch, useAppSelector } from 'store';

import nonImageProfileImg from 'ui/img/image-profile.jpg';
import boopSfx from 'ui/sound/sound.mp3';

import useSound from 'use-sound';
import { useEffect } from 'react';
import { setMute } from 'modules/Header/store';

const UserInfo = () => {
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  const { isMute } = useAppSelector((state) => state.header);

  const [play, { sound, stop, pause }] = useSound(boopSfx, {
    loop: true,
    volume: 0.15,
  });

  useEffect(() => {
    const isMuteStorage = localStorage.getItem('isMute');

    if (!isMuteStorage) {
      localStorage.setItem('isMute', 'false');
      dispatch(setMute(false));
    }

    if (isMuteStorage) {
      const isMute = isMuteStorage === 'true' ? true : false;
      dispatch(setMute(isMute));
    }

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const state = sound?.state();

    if (state === 'loaded' && !isMute) {
      play();
    }
  }, [sound]);

  const onToggleMute = () => {
    dispatch(setMute(!isMute));
    if (!isMute) stop();
    if (isMute) play();

    localStorage.setItem('isMute', String(!isMute));
  };

  const handleClick = () => {
    window.open('https://t.me/quackup_official', '_blank');
  };

  return (
    <div className={styles.userInfo}>
      <div className={styles.blockImg}>
        {user.photoUrl && <img className={styles.img} src={user.photoUrl} alt="Image" />}
        {!user.photoUrl && <img className={styles.img} src={nonImageProfileImg} alt="Image" />}
      </div>
      <div className={styles.blockInfo}>
        {user.firstName} {user.lastName}
        <div className={styles.mute}>
          {isMute ? <MuteIcon onClick={onToggleMute} /> : <UnMuteIcon onClick={onToggleMute} />}
          <TelegramIcon onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
