import { FC, ReactNode } from 'react';
import HeaderTitle from './components/HeaderTitle';

import styles from './ModalWrapper.module.css';

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: FC<ModalWrapperProps> = ({ title, onClose, children }) => {
  return (
    <div className={styles.wrap}>
      <HeaderTitle title={title} onClose={onClose} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default ModalWrapper;
