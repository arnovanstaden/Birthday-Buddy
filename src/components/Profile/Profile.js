import { useParams } from 'react-router-dom';


// Components
import Page from '../UI/Page/Page';
import Input from "../UI/Library/Input/Input";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./profile.module.scss";

const Profile = () => {
    // Config
    const { id } = useParams();

    // Hooks
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
                <section className={styles.info}>
                    <h1>Dwight Schrute</h1>
                    <p>Today</p>
                    <p>Wednesday, 19/05 </p>
                </section>
            </Container>

            <section className={styles.extra}>
                <Container>
                    <Input
                        label="Notes"
                        type="text"
                        textArea={4}
                    />
                </Container>
            </section>
        </Page>
    )
}

export default Profile
