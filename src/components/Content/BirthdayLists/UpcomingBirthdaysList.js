import { v4 as uuid } from "uuid";
import { isBirthdayToday, sortBirthdays } from "../../../utils/general"

// Components
import BirthdayCard from "../BirthdayCard/BirthdayCard";
import ContentCard from "../ContentCard/ContentCard"
import Button from "../../UI/Library/Button/Button"

// MUI
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./list.module.scss";
import Logo from "../../../assets/images/logos/logo.svg";

const UpcomingBirthdaysList = ({ birthdays }) => {
    console.log(birthdays)
    let upcomingBirthdays = birthdays && birthdays.filter(birthday => !isBirthdayToday(new Date(birthday.date)));
    upcomingBirthdays = upcomingBirthdays && sortBirthdays(upcomingBirthdays)

    return (
        <Grid container spacing={3} className={styles.grid}>
            {upcomingBirthdays && upcomingBirthdays.length > 0 ?
                upcomingBirthdays.map(birthday => (
                    <Grid item xs={12} sm={6} key={uuid()}>
                        <BirthdayCard birthday={birthday} />
                    </Grid>
                ))
                :
                <Grid item xs={12} sm={6} key={uuid()}>
                    <ContentCard className={styles.noBirthday} image={Logo}>
                        {birthdays && birthdays.length < 1 ?
                            <>
                                <h3>No Birthdays Yet :(</h3>
                                <p>Add a birthday remind yourself and send your congratulations.</p>
                                <Button className={styles.button}>
                                    <i className="icon-add"></i>
                                Add a Birthday
                            </Button>
                            </>
                            :
                            <>
                                <h3>No Upcoming Birthdays</h3>
                                <p>Any upcoming birthdays you add will appear here.</p>
                            </>
                        }
                    </ContentCard>
                </Grid>
            }
        </Grid>
    )
}

export default UpcomingBirthdaysList
