import { v4 as uuid } from "uuid";
import { isBirthdayToday, sortBirthdays } from "../../../utils/general"

// Components
import BirthdayCard from "../BirthdayCard/BirthdayCard";

// MUI
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./list.module.scss"

const UpcomingBirthdaysList = ({ birthdays }) => {

    let upcomingBirthdays = birthdays && birthdays.filter(birthday => !isBirthdayToday(new Date(birthday.date)));
    upcomingBirthdays = upcomingBirthdays && sortBirthdays(upcomingBirthdays)

    return (
        <Grid container spacing={3} className={styles.grid}>
            {upcomingBirthdays ?
                upcomingBirthdays.map(birthday => (
                    <Grid item xs={12} sm={6} key={uuid()}>
                        <BirthdayCard birthday={birthday} />
                    </Grid>
                ))
                : <p>No Birthdays Yet :</p>}
            {/* FIX THIS ^ */}
        </Grid>
    )
}

export default UpcomingBirthdaysList
