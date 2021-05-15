import styles from "./input.module.scss";

const Input = ({ label, type, inputRef, autoFocus, placeholder, required, textArea, onChange, defaultValue }) => {
    return (
        <div className={styles.group}>
            <label htmlFor={label}>{label}</label>
            {!textArea
                ? <input
                    name={label && label.toLowerCase()}
                    type={type}
                    ref={inputRef}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange || null}
                    defaultValue={defaultValue || null}
                />
                : <textarea
                    name={label && label.toLowerCase()}
                    ref={inputRef}
                    placeholder={placeholder}
                    required={required}
                    rows={textArea}
                    defaultValue={defaultValue || null}
                />
            }

        </div>
    )
}

export default Input
