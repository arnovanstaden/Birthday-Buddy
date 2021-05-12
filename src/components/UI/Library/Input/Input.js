import styles from "./input.module.scss";

const Input = ({ label, type, inputRef, autoFocus, placeholder, required }) => {
    return (
        <div className={styles.group}>
            <label htmlFor={label}>{label}</label>
            <input
                name={label}
                type={type}
                ref={inputRef}
                autoFocus={autoFocus}
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}

export default Input
