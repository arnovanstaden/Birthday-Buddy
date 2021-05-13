import ClassNames from "classnames";

// Components
import Button from "../../UI/Library/Button/Button"

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
            {!today
                ? <>
                    <div className={styles.days}>
                        <h1>7</h1>
                        <p>days</p>
                    </div>
                    <div className={styles.divider} />
                </>
                : null
            }
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
                    {today ?
                        <div className={styles.options}>
                            <Button className={styles.button}>
                                <i className="icon-paper-plane"></i>
                                Send Message
                            </Button>
                            <Button hollow className={styles.button}>
                                <i className="icon-notifications"></i>
                                Remind Me
                            </Button>
                        </div>
                        : null
                    }
                </div>
            </div>
        </article >
    )
}

export default Card
