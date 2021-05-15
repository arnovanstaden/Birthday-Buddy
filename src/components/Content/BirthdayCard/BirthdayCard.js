import ClassNames from "classnames";
import { Link } from "react-router-dom";
import { getBirthdayDaysAway, getCardFormatAge, getCardFormatBirthday } from "../../../utils/general"


// Components
import Button from "../../UI/Library/Button/Button"
import Card from "../../UI/Library/Card/Card"

// Styles & Images
import styles from "./card.module.scss";
import EmptyProfileImg from "../../../assets/images/other/emptyProfile.png";

const BirthdayCard = ({ birthday, today }) => {
    // Config
    const birthDate = new Date(birthday.date);

    const classes = ClassNames(
        styles.card,
        today ? styles.today : null
    )

    return (
        <Link to={`/birthday/${birthday.id}`}>
            <Card className={classes}>
                {!today
                    ? <>
                        <div className={styles.days}>
                            <h1>{getBirthdayDaysAway(birthDate)}</h1>
                            <p>days</p>
                        </div>
                        <div className={styles.divider} />
                    </>
                    : null
                }
                <div className={styles.content}>
                    <div className={styles.image}>
                        <img src={birthday.profilePictureUrl || EmptyProfileImg} alt="Profile" />
                    </div>
                    <div className={styles.text}>
                        <h1>{birthday.name}</h1>
                        <div className={styles.bottom}>
                            {today
                                ? <p>Today</p>
                                : <p>{getCardFormatBirthday(birthDate)}</p>
                            }

                            <p>Turns {getCardFormatAge(birthDate)}</p>
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
            </Card >
        </Link>
    )
}

export default BirthdayCard
