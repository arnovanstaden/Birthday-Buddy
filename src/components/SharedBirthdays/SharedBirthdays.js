import { useContext, useState, useEffect } from "react";
import { getAllSharedBirthdays } from "../../utils/sharing";
// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Button from "../UI/Library/Button/Button";
import Nav from "../UI/Nav/Nav";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./shared.module.scss";

const SharedBirthdays = () => {

    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [sharedBirthdays, setSharedBirthdays] = useState(undefined);

    // Hooks
    useEffect(() => {
        if (!sharedBirthdays) {
            showLoader("Fetching Birthdays Shared with You");
            getAllSharedBirthdays()
                .then(result => {
                    console.log(result)
                    setSharedBirthdays(result);
                    hideLoader()
                })
        } else {
            hideLoader()
        }
    }, [sharedBirthdays]);

    return (
        <Page
            className={styles.shared}
            fullWidth
        >
            <Nav />
            <Container>

                <section>
                    <h2>Birthdays Shared With You</h2>
                    {/* <UpcomingBirthdaysList toggleAdd={toggleAddBirthday} birthdays={searchResults.length > 0 ? searchResults : birthdays} /> */}
                </section>
            </Container>
        </Page>
    )
}

export default SharedBirthdays
