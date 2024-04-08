import classNames from 'classnames';
import styles from './IconButton.module.css';
import { IconButtonProps } from './IconButton.types';
import Icon from '@components/ui/display/Icon/Icon';

const IconButton: React.FC<IconButtonProps> = ({ name, variant = 'contained' }) => {
  const classes = classNames(
    styles.IconButton,
    styles[`variant-${variant}`]
  );

  return (
    <button className={classes}>
      <Icon name={name} className={styles.icon} />
    </button>
  );
};

export default IconButton;
