import ClassNames from "classnames";

// Styles & Images
import styles from "./card.module.scss";
import pic from "../../../assets/images/test/profile.jpg";
import gift from "../../../assets/icons/custom/gift.svg";

const Card = ({ today }) => {
    const classes = ClassNames(
        styles.card,
        today ? styles.today : null
    )

    return (
        <article className={classes}>
            <div className={styles.days}>
                {today
                    ? <img src={gift} alt="Gift Icon" />
                    : <>
                        <h1>7</h1>
                        <p>days</p>
                    </>
                }
            </div>
            <div className={styles.divider} />
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={pic} alt="Profile" />
                </div>
                <div className={styles.text}>
                    <h1>Dwight Schrute</h1>
                    <div className={styles.bottom}>
                        {today
                            ? <p>Today</p>
                            : <p>Wednesday, 19/05 </p>
                        }

                        <p>Turns 49</p>
                    </div>
                </div>
            </div>
        </article >
    )
}

export default Card
