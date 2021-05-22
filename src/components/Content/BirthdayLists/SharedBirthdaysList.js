import { v4 as uuid } from "uuid";
import { sortShareBirthdays } from "../../../utils/general";

// Components
import SharedBirthdayCard from "../BirthdayCard/SharedBirthdayCard";
import ContentCard from "../ContentCard/ContentCard"
import Button from "../../UI/Library/Button/Button"

// MUI
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./list.module.scss";
import Logo from "../../../assets/images/logos/logo.svg";

const SharedBirthdaysList = ({ birthdays }) => {

    const sortedBirthdays = birthdays && sortShareBirthdays(birthdays)
    if (sortedBirthdays) {
        return (
            <Grid container spacing={3} className={styles.grid} >
                {sortedBirthdays && sortedBirthdays.length > 0 ?
                    sortedBirthdays.map(birthday => (
                        <Grid item xs={12} sm={6} lg={4} key={uuid()}>
                            <SharedBirthdayCard birthday={birthday} />
                        </Grid>
                    ))
                    :
                    <Grid item xs={12} sm={6} key={uuid()}>
                        <ContentCard className={styles.noBirthday} image={Logo}>
                            <h3>No Shared Birthdays</h3>
                            <p>Any birthdays other users share with you will appear here.</p>
                        </ContentCard>
                    </Grid>
                }
            </Grid>
        )
    }
    return null
}

export default SharedBirthdaysList
