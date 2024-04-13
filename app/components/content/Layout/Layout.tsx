import styles from './Layout.module.css';
import MobileNavbar from './MobileNavbar/MobileNavbar';

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={styles.Layout}>

      <main>
        {props.children}
      </main>
      <MobileNavbar />
    </div>
  );
};

export default Layout;
