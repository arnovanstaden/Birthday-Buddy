import classNames from 'classnames';
import styles from './TextArea.module.css';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = (props) => {
  const classes = classNames(
    styles.TextArea,
    props.className,
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  return (
    <textarea
      rows={3}
      {...props}
      className={classes}
      onChange={handleChange}
    />
  );
};

export default TextArea;
