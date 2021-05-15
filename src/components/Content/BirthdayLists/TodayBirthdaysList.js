import { v4 as uuid } from "uuid"
import { isBirthdayToday } from "../../../utils/general";

// Components
import BirthdayCard from "../BirthdayCard/BirthdayCard";
import Card from "../../UI/Library/Card/Card"

// MUI
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./list.module.scss"

const TodayBirthdaysList = ({ birthdays }) => {

    const todayBirthdays = birthdays && birthdays.filter(birthday => isBirthdayToday(new Date(birthday.date)));

    if (todayBirthdays && todayBirthdays.length > 0) {
        return (
            <>
                <h1>Today's Birthdays</h1>
                <Grid container spacing={3} className={styles.grid}>
                    {todayBirthdays.map(birthday => (
                        <Grid item xs={12} sm={6} key={uuid()}>
                            <BirthdayCard birthday={birthday} today />
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }
    return null
}

export default TodayBirthdaysList
