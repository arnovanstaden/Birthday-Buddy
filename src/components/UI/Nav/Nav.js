import { Link } from "react-router-dom";
import { useRef, useContext } from "react";

import { UserContext } from "../../../context/UserContext";

// MUI
import Container from "@material-ui/core/Container";

// Styles, Images
import styles from "./nav.module.scss";
import Logo from "../../../assets/images/logos/logo.svg"

const Nav = ({ backButton }) => {
    // Config
    const { signOut, getUsername } = useContext(UserContext);
    const menuRef = useRef();

    // Handlers
    const toggleMenu = () => {
        menuRef.current.classList.toggle(styles.open)
    }

    return (
        <header className={styles.header}>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.left}>
                        {backButton
                            ? <Link to="/">
                                <button>
                                    <i className="icon-carrot-left"></i>
                                </button>
                            </Link>
                            :
                            <Link to="/">
                                <img src={Logo} alt="Birthday Buddy Logo" />
                            </Link>}
                    </div>
                    <div className={styles.right}>
                        <i className="icon-lines" onClick={toggleMenu}></i>
                    </div>
                </nav>
            </Container >
            <div className={styles.menu} ref={menuRef}>
                <Container>
                    <ul>
                        <li className={styles.username}>
                            {getUsername()}
                        </li>
                        <li>
                            <Link to="/shared">
                                Shared Birthdays
                            </Link>
                        </li>
                        <li onClick={signOut}>
                            Logout
                        </li>
                    </ul>
                </Container>
            </div>
        </header>
    )
}

export default Nav
