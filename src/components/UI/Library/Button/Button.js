import ClassNames from "classnames"

import styles from "./button.module.scss";

const Button = ({
    children,
    hollow,
    fullWidth,
    onClick,
    className
}) => {

    const classes = ClassNames(
        className,
        styles.button,
        hollow ? styles.hollow : null,
        fullWidth ? styles.fullWidth : null
    )
    return (
        <button
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
