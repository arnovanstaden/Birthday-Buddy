import classNames from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = (props) => {
  const classes = classNames(
    styles.Input,
    props.className,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  return (
    <div className={classes}>
      {props.label && (
        <label>
          {props.label}
        </label>
      )}
      <input
        {...props}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
