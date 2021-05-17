import ClassNames from "classnames";

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
            {children}
        </main>

    )
}

export default Page;
