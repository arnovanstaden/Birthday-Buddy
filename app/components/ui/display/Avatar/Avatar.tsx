import classNames from 'classnames';
import styles from './Avatar.module.css';
import { AvatarProps } from './Avatar.types';

const Avatar: React.FC<AvatarProps> = ({ src, size = 42 }) => {
  const classes = classNames(
    styles.Avatar,
    styles[`size-${size}`]
  );
  return (
    <div className={classes}>
      <img src={src} alt="Avatar" />
    </div>
  );
};

export default Avatar;
