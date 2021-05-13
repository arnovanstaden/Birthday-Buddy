import ClassNames from "classnames";

// Components
import withAuth from "../../HOC/withAuth";
import Nav from "../Nav/Nav";

// Styles
import styles from "./page.module.scss";



const Page = ({ children, className, center, fullscreen, backButton }) => {

    const classes = ClassNames(
        className,
        styles.page,
        center ? styles.center : null,
        fullscreen ? styles.fullscreen : null
    )
    return (
        <main className={classes}>
            <Nav backButton={backButton} />
            {children}
        </main>

    )
}

export default withAuth(Page);
