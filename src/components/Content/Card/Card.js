import ClassNames from "classnames";


import styles from "./card.module.scss";
import pic from "../../../assets/images/test/profile.jpg";

const Card = ({ today }) => {
    const classes = ClassNames(

    )

    return (
        <article className={styles.card}>
            <div className={styles.days}>
                <h1>7</h1>
                <p>days</p>
            </div>
            <div className={styles.divider} />
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={pic} alt="Profile" />
                </div>
                <div className={styles.text}>
                    <h1>Dwight Schrute</h1>
                    <div className={styles.bottom}>
                        <p>Wednesday, 19/05</p>
                        <p>Turns 49</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Card
