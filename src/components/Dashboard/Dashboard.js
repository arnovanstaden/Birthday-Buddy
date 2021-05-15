import { useContext, useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { getAllBirthdays } from "../../utils/birthdays";

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";
import UpcomingBirthdaysList from "../Content/UpcomingBirthdaysList/UpcomingBirthdaysList";
import TodayBirthdaysList from "../Content/TodayBirthdaysList/TodayBirthdaysList";
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
    const [searchFilter, setSearchFilter] = useState([])


    // Hooks
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


    // Handlers
    const handleSearch = (e) => {

    }

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
                    <TodayBirthdaysList birthdays={birthdays} />
                </section>


                <section className={styles.upcoming}>
                    <h2>Upcoming Birthdays</h2>
                    <Input
                        type="text"
                        placeholder="Search a Person’s Name"
                        onChange={handleSearch}
                    />
                    <UpcomingBirthdaysList birthdays={birthdays} />
                </section>

                <div className={styles.add}>
                    <Button onClick={toggleAddBirthday}>
                        + Add a Birthday
                    </Button>
                </div>

            </Container>
            {showAddBirthday ? <AddBirthday toggle={toggleAddBirthday} addBirthdayUI={addBirthdayUI} /> : null}
        </Page>
    )
}

export default Dashboard
