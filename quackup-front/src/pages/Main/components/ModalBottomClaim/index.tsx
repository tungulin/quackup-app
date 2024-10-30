import { useAppSelector } from 'store';
import Button from 'ui/components/Button';

import WingIcon from 'ui/icons/wing.svg';
import MonetaIcon from 'ui/icons/moneta-duck.svg';

import ModalBottom from 'ui/components/ModalBottom';

import styles from './ModalBottomClaim.module.css';

type ModalBottomClaimProps = {
  onClose: () => void;
  isOpen: boolean;
};

const ModalBottomClaim = ({ isOpen, onClose }: ModalBottomClaimProps) => {
  const user = useAppSelector((state) => state.session.user);

  return (
    <ModalBottom isOpen={isOpen}>
      <h2 className={styles.iconHeader}>OFFLINE REWARD</h2>
      <p className={styles.claimStyle}>
        <MonetaIcon />X {user.offlineReward}
      </p>
      <WingIcon />
      {/* todo: marginBottom: 10 - need transfer to ui/components/Button */}
      <div style={{ marginBottom: 10 }}>
        <Button name="CLAIM" height="xl" onClick={onClose} />
      </div>
    </ModalBottom>
  );
};

export default ModalBottomClaim;
