import styles from "./button.module.scss";

const IconButton = ({ icon }) => {
    return (
        <button className={styles.button}>
            <i className={`icon-${icon}`}></i>
        </button>
    )
}

export default IconButton
