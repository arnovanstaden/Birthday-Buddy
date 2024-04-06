import classNames from 'classnames';
import styles from './IconButton.module.css';
import { IconButtonProps } from './IconButton.types';
import Icon from '@components/ui/display/Icon/Icon';

const IconButton: React.FC<IconButtonProps> = ({ name }) => {
  const classes = classNames(
    styles.IconButton,
  );

  return (
    <button className={classes}>
      <Icon name={name} />
    </button>
  );
};

export default IconButton;
