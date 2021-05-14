import { useContext, useState } from "react";

// Context
import { UserContext } from "../../context/UserContext"

// Components
import Page from "../UI/Page/Page";
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";
import Card from "../Content/Card/Card";
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

    const [showAddBirthday, setShowAddBirthday] = useState(false);

    // handler
    const toggleAddBirthday = () => {
        setShowAddBirthday(prev => !prev)
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
                            <Card today />
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
                        <Grid item xs={12} sm={6}>
                            <Card />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card />
                        </Grid>
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
