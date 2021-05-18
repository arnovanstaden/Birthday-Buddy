import ClassNames from "classnames";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { getBirthdayDaysAway, getCardFormatAge, getCardFormatBirthday, sendMessage } from "../../../utils/general"
import { scheduleReminder } from "../../../utils/reminders";
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Button from "../../UI/Library/Button/Button"
import Card from "../../UI/Library/Card/Card"
import Modal from "../../UI/Modal/Modal";

// Styles & Images
import styles from "./card.module.scss";
import EmptyProfileImg from "../../../assets/images/other/emptyProfile.png";

const BirthdayCard = ({ birthday, today }) => {
    // Config
    const birthDate = new Date(birthday.date);
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [showReminderModal, setShowReminderModal] = useState(false)

    const classes = ClassNames(
        styles.card,
        today ? styles.today : null
    )

    const handleSendMessage = () => {
        history.block()
        sendMessage(birthday.name)
    }

    const handleShowReminderModal = () => {
        history.block()
        if (Notification.permission !== "granted") {
            return alert("You need to enable notifications for this app first.")
        }
        setShowReminderModal(true)
    }

    const handleSetReminder = (hours) => {
        setShowReminderModal(false)
        showLoader("Setting Reminder")
        scheduleReminder(hours, birthday).then(result => {
            hideLoader()
            enqueueSnackbar(result.message, {
                variant: 'success',
            });
            console.log(result);
        })
    }

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
                                <Button className={styles.button} onClick={handleSendMessage}>
                                    <i className="icon-paper-plane"></i>
                                    Send Message
                                </Button>
                                <Button hollow className={styles.button} onClick={handleShowReminderModal}>
                                    <i className="icon-notifications"></i>
                                    Remind Me
                                </Button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </Card >

            <Modal status={showReminderModal}
                content={{
                    heading: "Set Reminder",
                    text: "Please choose an option when you would like to be reminded:"
                }}>
                <Button onClick={() => handleSetReminder(1)}>
                    1 Hour From Now
                    </Button>
                <Button onClick={() => handleSetReminder(3)}>
                    3 Hours From Now
                    </Button>
                <Button onClick={() => handleSetReminder(6)}>
                    6 Hours From Now
                    </Button>
                <Button onClick={() => setShowReminderModal(false)} hollow>
                    Cancel
                    </Button>
            </Modal>
        </Link >
    )
}

export default BirthdayCard
