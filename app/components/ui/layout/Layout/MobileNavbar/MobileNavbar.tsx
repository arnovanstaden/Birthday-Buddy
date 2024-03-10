import Icon from '@components/ui/display/Icon/Icon';
import styles from './MobileNavbar.module.css';

const MobileNavbar: React.FC = () => {
  return (
    <nav className={styles.MobileNavbar}>
      <button>
        <Icon name="home" />
      </button>
      <button>
        <Icon name="add" colour="gray" />
      </button>
      <button>
        <Icon name="share" colour="gray" />
      </button>
      <button>
        <Icon name="person" colour="gray" />
      </button>
    </nav>
  );
};

export default MobileNavbar;
