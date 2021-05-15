
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./loader.module.scss"

const Loader = () => {

    return (
        <div className={styles.loader}>
            <CircularProgress classes={{
                root: styles.root,
                circle: styles.circle,
            }} />
        </div>
    )
}

export default Loader
