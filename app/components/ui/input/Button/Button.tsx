import classNames from 'classnames';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ colour = "primary", children }) => {
  const classes = classNames(
    styles.Button,
    styles[`colour-${colour}`]
  );

  return (
    <button className={classes}>
      {children}
    </button>
  );
};

export default Button;
