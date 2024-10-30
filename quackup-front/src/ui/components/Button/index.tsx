import styles from './Button.module.css';
import { classNames } from '@telegram-apps/sdk';

type ButtonProps = {
  name: string;
  onClick: () => void;
  height: 'xl';
};

const Button = ({ name, onClick, height }: ButtonProps) => {
  return (
    <div onClick={onClick} className={classNames(styles.button, styles[height])}>
      {name}
    </div>
  );
};

export default Button;
