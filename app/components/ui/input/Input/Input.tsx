import classNames from 'classnames';
import styles from './Input.module.css';
import { InputProps } from './Input.types';
import Typography from '@components/ui/display/Typography/Typography';

const Input: React.FC<InputProps> = ({ error, ...props }) => {
  const classes = classNames(
    styles.Input,
    props.className,
    error && styles.error,
  );
  return (
    <div className={classes}>
      <input
        {...props.inputProps}
        {...props.register}
      />
      {error && (
        <Typography variant="small" weight={300} color="green">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;
