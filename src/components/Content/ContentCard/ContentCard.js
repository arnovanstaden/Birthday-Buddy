// Components
import Card from "../../UI/Library/Card/Card";

// Styles
import styles from "./card.module.scss";

const ContentCard = ({ children, className, image }) => {
    return (
        <Card className={`${styles.card} ${className}`}>
            <div className={styles.image}>
                <img src={image} alt="Icon" />
            </div>
            <div className={styles.text}>
                {children}
            </div>
        </Card>
    )
}

export default ContentCard
