import Icon from '@components/ui/display/Icon/Icon';
import styles from './MobileNavbar.module.css';
import { Link } from '@remix-run/react';
import { useLocation } from "@remix-run/react";

const MobileNavbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.MobileNavbar}>
      <Link to="/" className={styles.link}>
        <button>
          <Icon name="home" colour={pathname === "/" ? 'green' : 'gray'} />
        </button>
      </Link>
      <Link to="/birthday/add" className={styles.link}>
        <button>
          <Icon name="add" colour={pathname === "/birthday/add" ? 'green' : 'gray'} />
        </button>
      </Link>
      <Link to="/share" className={styles.link}>
        <button>
          <Icon name="share" colour={pathname === "/share" ? 'green' : 'gray'} />
        </button>
      </Link>
      <Link to="/profile" className={styles.link}>
        <button>
          <Icon name="person" colour={pathname === "/profile" ? 'green' : 'gray'} />
        </button>
      </Link>
    </nav>
  );
};

export default MobileNavbar;
