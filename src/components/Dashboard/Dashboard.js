import { useContext } from "react";

// Context
import { UserContext } from "../../context/UserContext"

// Components
import Page from "../UI/Page/Page";
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    const { signOut } = useContext(UserContext);

    return (
        <Page
            className={styles.dashboard}
            fullWidth
        >
            <Container>
                <div className={styles.today}>
                    <h1>Today's Birthdays</h1>
                </div>


                <div className={styles.upcoming}>
                    <h2>Upcoming Birthdays</h2>
                    <Input
                        type="text"
                        placeholder="Search a Person’s Name"
                    />
                </div>

                <div className={styles.add}>
                    <Button>
                        + Add a Birthday
                    </Button>
                </div>

            </Container>
        </Page>
    )
}

export default Dashboard
