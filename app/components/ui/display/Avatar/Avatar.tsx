import styles from './Avatar.module.css';
import { AvatarProps } from './Avatar.types';

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className={styles.Avatar}>
      <img src={src} alt="Avatar" />
    </div>
  );
};

export default Avatar;
