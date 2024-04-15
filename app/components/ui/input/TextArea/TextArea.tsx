import classNames from 'classnames';
import styles from './TextArea.module.css';
import { TextAreaProps } from './TextArea.types';
import Typography from '@components/ui/display/Typography/Typography';

const TextArea: React.FC<TextAreaProps> = ({ error, ...props }) => {
  const classes = classNames(
    styles.TextArea,
    props.className,
    error && styles.error,

  );

  return (
    <div className={classes}>
      <textarea
        rows={3}
        {...props.textareaProps}
        {...props.register}
        className={classes}
      />
      {error && (
        <Typography variant="small" weight={300} color="green">
          {error}
        </Typography>
      )}
    </div>

  );
};

export default TextArea;
