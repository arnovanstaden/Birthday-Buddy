import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { getFamousBirthdays, getTodayInHistory } from "../../utils/profile"
import { getBirthday, deleteBirthday } from "../../utils/birthdays"
import { getCardFormatAge } from "../../utils/general"

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from '../UI/Page/Page';
import Input from "../UI/Library/Input/Input";
import ContentCard from "../Content/ContentCard/ContentCard";
import Loader from "../UI/Library/Loader/Loader";

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

    // State
    const [birthday, setBirthday] = useState()
    const [famousBirthdays, setFamousBirthdays] = useState()
    const [todayInHistory, setTodayInHistory] = useState()
    const [anchorEl, setAnchorEl] = useState(null);

    // Hooks
    useEffect(() => {
        if (!famousBirthdays) {
            getFamousBirthdays(new Date()) //Fix THis
                .then(result => {
                    setFamousBirthdays(result);
                })
        }
    }, [famousBirthdays]);

    useEffect(() => {
        if (!todayInHistory) {
            getTodayInHistory(new Date()) //Fix THis
                .then(result => {
                    setTodayInHistory(result);
                })
        }
    }, [todayInHistory]);

    useEffect(() => {
        if (!birthday) {
            showLoader("Fetching Birthday");
            getBirthday(id)
                .then(result => {
                    setBirthday(result);
                    hideLoader()
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

    const handleDelete = () => {
        handleNavClose();
        showLoader("Deleting Birthday");
        deleteBirthday(id)
            .then(result => {
                setBirthday(result);
                hideLoader();
                history.goBack();
            })
    }


    if (birthday) {
        const birthDate = new Date(birthday.date)

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
                            <MenuItem onClick={handleNavClose}>Edit Birthday</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete Birthday</MenuItem>
                        </Menu>
                    </nav>
                </Container>

                <Container>
                    <section className={styles.info}>
                        <img src={birthday.profilePictureUrl ? birthday.profilePictureUrl : EmptyProfileImg} alt="Profile" />
                        <h1>{birthday.name}</h1>
                        <p><span>Birthday:</span> {birthday.date} </p>
                        <p><span>Age:</span> {getCardFormatAge(birthDate) - 1} </p>
                    </section>
                </Container>

                <section className={styles.extra}>
                    <Container>
                        <Input
                            label="Notes"
                            type="text"
                            textArea={4}
                        />
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
            </Page>
        )
    }
    return null
}

export default Profile
