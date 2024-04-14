import { useLocation } from '@remix-run/react';
import styles from './Layout.module.css';
import MobileNavbar from './MobileNavbar/MobileNavbar';
import classNames from 'classnames';

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');

  const classes = classNames(
    styles.Layout,
    !isAuthRoute && styles.authenticated,
  )

  return (
    <div className={classes}>

      <main>
        {props.children}
      </main>
      {!isAuthRoute && <MobileNavbar />}
    </div>
  );
};

export default Layout;
