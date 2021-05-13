import styles from "./input.module.scss";

const Input = ({ label, type, inputRef, autoFocus, placeholder, required, textArea }) => {
    return (
        <div className={styles.group}>
            <label htmlFor={label}>{label}</label>
            {!textArea
                ? <input
                    name={label}
                    type={type}
                    ref={inputRef}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    required={required}
                />
                : <textarea
                    name={label}
                    ref={inputRef}
                    placeholder={placeholder}
                    required={required}
                    rows={textArea}
                />
            }

        </div>
    )
}

export default Input
