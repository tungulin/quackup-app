import { createPortal } from 'react-dom';
import styles from './ModalBottom.module.css';

// todo: add children type
type ModalBottomProps = {
  children: any;
  isOpen: boolean;
};

const ModalBottom = ({ children, isOpen }: ModalBottomProps) => {
  return createPortal(
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    ),
    document.body
  );
};

export default ModalBottom;
