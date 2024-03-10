import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = () => {
  return (
    <button className={styles.Button}>
      Ok
    </button>
  );
};

export default Button;
