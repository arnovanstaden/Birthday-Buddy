import classNames from 'classnames';
import styles from './TextArea.module.css';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = (props) => {
  const classes = classNames(
    styles.TextArea,
    props.className,
  );

  return (
    <textarea
      rows={3}
      {...props}
      className={classes}
    />
  );
};

export default TextArea;
