import classNames from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = (props) => {
  const classes = classNames(
    styles.Input,
    props.className,
  );

  return (
    <input
      {...props}
      className={classes}
    />
  );
};

export default Input;
