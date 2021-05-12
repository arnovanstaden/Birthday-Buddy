import ClassNames from "classnames"

import styles from "./button.module.scss";

interface IProps {
    children: React.ReactNode;
    outline?: boolean;
    fullWidth?: boolean;
    onClick?: any
}

const Button = ({
    children,
    outline,
    fullWidth,
    onClick
}: IProps) => {

    const classes = ClassNames(
        styles.button,
        outline ? styles.outline : null,
        fullWidth ? styles.fullWidth : null
    )
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
