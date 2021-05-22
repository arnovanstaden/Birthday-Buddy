import ClassNames from "classnames";
import { useState, useContext, useRef } from "react";
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

const SharedBirthdayCard = ({ birthday, today }) => {
    // Config
    const birthDate = new Date(birthday.date);
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const cardRef = useRef()

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
        <Card className={classes}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={birthday.profilePictureUrl || EmptyProfileImg} alt="Profile" />
                </div>
                <div className={styles.text}>
                    <h1>{birthday.name}</h1>
                    <div className={styles.bottom}>
                        <p>{getCardFormatBirthday(birthDate)}</p>
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default SharedBirthdayCard
