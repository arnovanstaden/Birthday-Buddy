import { useContext, useState, useEffect } from "react";
import { getAllBirthdays } from "../../utils/birthdays";

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";
import UpcomingBirthdaysList from "../Content/BirthdayLists/UpcomingBirthdaysList";
import TodayBirthdaysList from "../Content/BirthdayLists/TodayBirthdaysList";
import ManageBirthday from "../Content/ManageBirthday/ManageBirthday";
import Nav from "../UI/Nav/Nav";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [showAddBirthday, setShowAddBirthday] = useState(false);
    const [birthdays, setBirthdays] = useState(undefined);
    const [searchResults, setSearchResults] = useState([])

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
        const searchTerm = e.target.value.toLowerCase();
        const matches = birthdays.filter(birthday => birthday.name.toLowerCase().includes(searchTerm));
        console.log(matches)

        if (matches.length > 0) {
            console.log("here")
            setSearchResults(matches)
        } else {
            setSearchResults([])
        }
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
                    <TodayBirthdaysList birthdays={birthdays} />
                </section>


                <section className={styles.upcoming}>
                    <h2>Upcoming Birthdays</h2>
                    <Input
                        type="text"
                        placeholder="Search a Person’s Name"
                        onChange={handleSearch}
                    />
                    <UpcomingBirthdaysList toggleAdd={toggleAddBirthday} birthdays={searchResults.length > 0 ? searchResults : birthdays} />
                </section>

                <div className={styles.add}>
                    <Button onClick={toggleAddBirthday}>
                        + Add a Birthday
                    </Button>
                </div>

            </Container>
            {showAddBirthday ? <ManageBirthday open={showAddBirthday} toggle={toggleAddBirthday} addBirthdayUI={addBirthdayUI} /> : null}
        </Page>
    )
}

export default Dashboard
