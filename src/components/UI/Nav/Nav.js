import { Link } from "react-router-dom";

// MUI
import Container from "@material-ui/core/Container";

// Styles, Images
import styles from "./nav.module.scss";
import Logo from "../../../assets/images/logos/logo.svg"

const Nav = ({ backButton }) => {
    return (
        <header>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.left}>
                        {backButton
                            ? <Link to="/">
                                <button>
                                    <i className="icon-carrot-left"></i>
                                </button>
                            </Link>
                            : <img src={Logo} alt="Birthday Buddy Logo" />}
                    </div>
                    <div className={styles.right}>
                        |||
                    </div>
                    {/* <div className={styles.menu}>
                        <ul>
                            <li>
                                <Link to="/">
                                    Account Settings
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    Notifications
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </nav>
            </Container >
        </header>
    )
}

export default Nav
