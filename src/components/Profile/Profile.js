import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from "react";
import { getFamousBirthdays, getTodayInHistory } from "../../utils/profile"
import { getBirthday, deleteBirthday } from "../../utils/birthdays"
import { isBirthdayToday, sendMessage } from "../../utils/general"
import { scheduleReminder } from "../../utils/reminders";
import { useSnackbar } from 'notistack';
import { shareBirthdays } from "../../utils/sharing";
import { verifyUserExists } from "../../utils/user";

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from '../UI/Page/Page';
import Modal from '../UI/Modal/Modal';
import Button from "../UI/Library/Button/Button";
import Input from "../UI/Library/Input/Input";
import ContentCard from "../Content/ContentCard/ContentCard";
import Loader from "../UI/Library/Loader/Loader";
import ManageBirthday from "../Content/ManageBirthday/ManageBirthday";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Styles & Images
import styles from "./profile.module.scss";
import Logo from "../../assets/images/logos/logo.svg";
import HistoryIcon from "../../assets/icons/custom/history.svg";
import EmptyProfileImg from "../../assets/images/other/emptyProfile.png";


const Profile = () => {
    // Config
    const { id } = useParams();
    const history = useHistory()
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const { enqueueSnackbar } = useSnackbar();
    const shareEmailRef = useRef();

    // State
    const [birthday, setBirthday] = useState()
    const [famousBirthdays, setFamousBirthdays] = useState()
    const [todayInHistory, setTodayInHistory] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [showEditBirthday, setShowEditBirthday] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false);

    // Hooks
    useEffect(() => {
        if (!birthday) {
            showLoader("Fetching Birthday");
            getBirthday(id)
                .then(result => {
                    if (!result) {
                        return history.replace("/")
                    }
                    setBirthday(result);
                    if (!famousBirthdays) {
                        getFamousBirthdays(new Date(result.date)) //Fix THis
                            .then(result => {
                                setFamousBirthdays(result);
                            })
                    }
                    if (!todayInHistory) {
                        getTodayInHistory(new Date(result.date)) //Fix THis
                            .then(result => {
                                setTodayInHistory(result);
                            })
                    }
                    hideLoader();
                })
        } else {
            hideLoader()
        }
    }, [birthday]);


    // Handlers
    const handleNavClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNavClose = () => {
        setAnchorEl(null);
    };

    const toggleEditBirthday = () => {
        handleNavClose()
        setShowEditBirthday(prev => !prev);
    }

    const handleDelete = () => {
        handleNavClose();
        setShowDeleteModal(false)
        showLoader("Deleting Birthday");
        deleteBirthday(id)
            .then(result => {
                setBirthday(result);
                hideLoader();
                history.replace("/");
            })
    }

    const handleEdit = (newBirthday) => {
        setBirthday(newBirthday);
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
        })
    }

    const handleShare = () => {
        const shareEmail = shareEmailRef.current.value.toLowerCase().trim();
        showLoader("Sharing Birthdays...")

        verifyUserExists(shareEmail).then(result => {
            handleNavClose();
            setShowShareModal(false);
            shareBirthdays(result, [birthday]).then((result) => {
                hideLoader();
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
            }).catch(err => {
                hideLoader();
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })
        }).catch(err => {
            hideLoader()
            return enqueueSnackbar(err.message, {
                variant: 'error',
            });
        });
    }



    if (birthday) {
        const birthDate = new Date(birthday.date);

        return (
            <Page
                className={styles.profile}
                fullWidth
            >
                <Container>
                    <nav className={styles.nav}>
                        <i className="icon-carrot-left" onClick={() => history.goBack()}></i>
                        <i className="icon-dots" aria-controls="simple-menu" aria-haspopup="true" onClick={handleNavClick}></i>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleNavClose}
                        >
                            {/* <MenuItem onClick={}>Share Birthday</MenuItem> */}
                            <MenuItem onClick={toggleEditBirthday}>Edit Birthday</MenuItem>
                            <MenuItem onClick={() => setShowShareModal(true)}>Share Birthday</MenuItem>
                            <MenuItem onClick={() => setShowDeleteModal(true)}>Delete Birthday</MenuItem>
                        </Menu>
                    </nav>
                </Container>

                <Container>
                    <section className={styles.info}>
                        <div className={styles.image}>
                            <img src={birthday.profilePictureUrl || EmptyProfileImg} alt="Profile" />
                        </div>
                        <h1>{birthday.name}</h1>
                        {!isBirthdayToday(birthDate)
                            ?
                            <p><span>Birthday:</span>  {birthday.date}</p>
                            :
                            <>
                                <p><span>Birthday:</span> {isBirthdayToday(birthDate) ? <span className={styles.today}>Today</span> : birthday.date} </p>
                                <div className={styles.options}>
                                    <Button className={styles.button} onClick={() => sendMessage(birthday.name)}>
                                        <i className="icon-paper-plane"></i>
                                        Send Message
                                    </Button>
                                    <Button onClick={handleShowReminderModal} hollow className={styles.button}>
                                        <i className="icon-notifications"></i>
                                        Remind Me
                                    </Button>
                                </div>
                            </>
                        }
                    </section>
                </Container>

                <section className={styles.extra}>
                    <Container>
                        <div className={styles.notes}>
                            <h2>Notes</h2>
                            <p>
                                {birthday.notes || "No notes yet..."}
                            </p>
                        </div>

                        <h2>On this Day</h2>
                        <Grid container spacing={3} className={styles.grid}>
                            <Grid item xs={12} md={6}>
                                <ContentCard className={styles.card} image={Logo}>
                                    <h3>Famous Birthdays</h3>
                                    {famousBirthdays ?
                                        <p>
                                            {famousBirthdays}
                                        </p>
                                        :
                                        <Loader />
                                    }
                                </ContentCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ContentCard className={styles.card} image={HistoryIcon}>
                                    <h3>This Day in History</h3>
                                    {todayInHistory ?
                                        <p>
                                            {todayInHistory}
                                        </p>
                                        :
                                        <Loader />
                                    }
                                </ContentCard>
                            </Grid>
                        </Grid>
                    </Container>
                </section>

                {showEditBirthday ? <ManageBirthday open={showEditBirthday} toggle={toggleEditBirthday} editBirthdayState={handleEdit} birthday={birthday} /> : null}


                <Modal status={showDeleteModal}
                    content={{
                        heading: "Are you sure?",
                        text: "If you delete this birthday the data will be lost forever."
                    }}>
                    <Button onClick={handleDelete}>
                        Delete
                        </Button>
                    <Button onClick={() => setShowDeleteModal(false)} hollow>
                        Cancel
                    </Button>
                </Modal>

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

                <Modal status={showShareModal}
                    content={{
                        heading: "Enter User Email",
                        text: "Please enter the registered email of the user you wish to share birthdays with."
                    }}>
                    <Input
                        type="email"
                        autoFocus
                        inputRef={shareEmailRef}
                    />
                    <Button onClick={handleShare}>
                        Share
                </Button>
                    <Button onClick={() => setShowShareModal(false)} hollow>
                        Cancel
                </Button>
                </Modal>


            </Page>
        )
    }
    return null
}

export default Profile;
