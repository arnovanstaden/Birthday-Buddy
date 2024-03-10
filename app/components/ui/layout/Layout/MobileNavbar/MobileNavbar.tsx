import Icon from '@components/ui/display/Icon/Icon';
import styles from './MobileNavbar.module.css';
import { Link } from '@remix-run/react';

const MobileNavbar: React.FC = () => {
  return (
    <nav className={styles.MobileNavbar}>
      <Link to="/" className={styles.link}>
        <button>
          <Icon name="home" />
        </button>
      </Link>
      <Link to="add" className={styles.link}>
        <button>
          <Icon name="add" colour="gray" />
        </button>
      </Link>
      <Link to="share" className={styles.link}>
        <button>
          <Icon name="share" colour="gray" />
        </button>
      </Link>
      <Link to="profile" className={styles.link}>
        <button>
          <Icon name="person" colour="gray" />
        </button>
      </Link>
    </nav>
  );
};

export default MobileNavbar;
