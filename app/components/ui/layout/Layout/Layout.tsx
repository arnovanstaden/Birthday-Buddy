import Container from '../Container/Container';
import styles from './Layout.module.css';
import MobileNavbar from './MobileNavbar/MobileNavbar';

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={styles.Layout}>

      <main>
        <Container>
          {props.children}
        </Container>
      </main>
      <MobileNavbar />
    </div>
  );
};

export default Layout;
