import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";

// Components
import Page from '../UI/Page/Page';
import Input from "../UI/Library/Input/Input";
import Card from "../UI/Library/Card/Card";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./profile.module.scss";
import Pic from "../../assets/images/test/profile.jpg";
import Logo from "../../assets/images/logos/logo.svg";
import HistoryIcon from "../../assets/icons/custom/history.svg";
import EmptyProfileImg from "../../assets/images/other/emptyProfile.png";


const Profile = () => {
    // Config
    const { id } = useParams();
    const history = useHistory()

    // State
    // const [birthdays, setBirthdays] = useState
    // // Hooks
    // useEffect(() => {
    //     if (!deck) {
    //         showLoader("Fetching Deck");
    //         getDeck(id)
    //             .then(result => {
    //                 setDeck(result);
    //             })
    //         getDeckCards(id)
    //             .then(result => {
    //                 setCards(result);
    //                 hideLoader()
    //             })
    //     } else {
    //         hideLoader()
    //     }
    // }, [deck]);


    return (
        <Page
            className={styles.profile}
            fullWidth
        >
            <Container>
                <nav className={styles.nav}>
                    <i className="icon-carrot-left" onClick={() => history.goBack()}></i>
                    <i className="icon-dots"></i>
                </nav>
            </Container>

            <Container>
                <section className={styles.info}>
                    <img src={Pic} alt="Profile" />
                    {/* <img src={birthday.profilePictureUrl ? birthday.profilePictureUrl : EmptyProfileImg} alt="Profile" /> */}
                    <h1>Dwight Schrute</h1>
                    <p>Wednesday, 19/05 </p>
                    <p>Turns 45 </p>
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
                            <Card className={styles.card}>
                                <div className={styles.image}>
                                    <img src={Logo} alt="Birthday Buddy Logo" />
                                </div>
                                <div className={styles.text}>
                                    <h3>Famous Birthdays</h3>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo alias ex autem sapiente vero</p>
                                </div>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card className={styles.card}>
                                <div className={styles.image}>
                                    <img src={HistoryIcon} alt="History Icon" />
                                </div>
                                <div className={styles.text}>
                                    <h3>Today in History</h3>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo alias ex autem sapiente vero.</p>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Page>
    )
}

export default Profile
