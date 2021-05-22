import { useContext, useState, useEffect } from "react";
import { getAllSharedBirthdays } from "../../utils/sharing";
// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Button from "../UI/Library/Button/Button";
import Nav from "../UI/Nav/Nav";
import SharedBirthdaysList from "../Content/BirthdayLists/SharedBirthdaysList";

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
                    <p>Click &amp; Hold to Select Birthdays</p>
                    <SharedBirthdaysList birthdays={sharedBirthdays} />
                </section>

                <div className={styles.options}>
                    <Button>
                        + Add to Your Birthdays
                    </Button>
                    <Button>
                        Delete Birthday(s)
                    </Button>
                </div>
            </Container>
        </Page>
    )
}

export default SharedBirthdays
