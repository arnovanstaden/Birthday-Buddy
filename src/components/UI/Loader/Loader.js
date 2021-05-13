// MUI
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./loader.module.scss"

const Loader = ({ text }) => {

    return (
        <div className={styles.loader}>
            <CircularProgress className={styles.circle} />
            <p>{text}...</p>
        </div>
    )
}

export default Loader
