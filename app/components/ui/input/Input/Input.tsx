import classNames from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = (props) => {
  const classes = classNames(
    styles.Input,
    props.className,
  );

  return (
    <div className={classes}>
      {props.label && (
        <label>
          {props.label}
        </label>
      )}
      <input
        {...props}
      />
    </div>
  );
};

export default Input;
