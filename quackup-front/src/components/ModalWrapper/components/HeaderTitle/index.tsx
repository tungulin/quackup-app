import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TitlePage.module.css';
import CloseIcon from 'ui/icons/close.svg';

interface TitlePageProps {
  title: string;
  onClose: () => void;
}

const HeaderTitle = ({ title, onClose }: TitlePageProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      {t(`titlePage.${title}`)}
      <CloseIcon
        className={styles.iconStyle}
        onClick={onClose}
      />
    </div>
  );
};

export default HeaderTitle;