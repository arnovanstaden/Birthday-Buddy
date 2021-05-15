import { useContext, useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { getAllBirthdays } from "../../utils/birthdays";
import { v4 as uuid } from "uuid"

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";
import BirthdayCard from "../Content/BirthdayCard/BirthdayCard";
import AddBirthday from "../Content/AddBirthday/AddBirthday";
import Nav from "../UI/Nav/Nav";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    // Config
    const { signOut } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    // State
    const [showAddBirthday, setShowAddBirthday] = useState(false);
    const [birthdays, setBirthdays] = useState(undefined);

    // // Hooks
    useEffect(() => {
        if (!birthdays) {
            showLoader("Fetching Birthdays");
            getAllBirthdays()
                .then(result => {
                    setBirthdays(result);
                    hideLoader()
                })
        } else {
            hideLoader()
        }
    }, [birthdays]);

    // handler
    const toggleAddBirthday = () => {
        setShowAddBirthday(prev => !prev)
    }

    const addBirthdayUI = (birthday) => {
        setBirthdays(prev => [...prev, birthday])
    }

    return (
        <Page
            className={styles.dashboard}
            fullWidth
        >
            <Nav />
            <Container>
                <section className={styles.today}>
                    <h1>Today's Birthdays</h1>
                    <Grid container spacing={3} className={styles.grid}>
                        <Grid item xs={12} sm={6}>
                            {/* <Card today /> */}
                        </Grid>
                    </Grid>
                </section>


                <section className={styles.upcoming}>
                    <h2>Upcoming Birthdays</h2>
                    <Input
                        type="text"
                        placeholder="Search a Person’s Name"
                    />
                    <Grid container spacing={3} className={styles.grid}>
                        {birthdays ?
                            birthdays.map(birthday => (
                                <Grid item xs={12} sm={6} key={uuid()}>
                                    <BirthdayCard birthday={birthday} />
                                </Grid>
                            ))
                            : <p>No Birthdays Yet :</p>}
                        {/* FIX THIS ^ */}
                    </Grid>
                </section>

                <div className={styles.add}>
                    <Button onClick={toggleAddBirthday}>
                        + Add a Birthday
                    </Button>
                </div>

            </Container>
            {showAddBirthday ? <AddBirthday toggle={toggleAddBirthday} /> : null}
        </Page>
    )
}

export default Dashboard
