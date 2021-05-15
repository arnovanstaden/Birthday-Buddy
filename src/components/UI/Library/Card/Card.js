import styles from "./card.module.scss";

const Card = ({ className, children }) => {
    return (
        <article className={`${styles.card} ${className}`}>
            {children}
        </article>
    )
}

export default Card
