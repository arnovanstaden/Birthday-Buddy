import { v4 as uuid } from "uuid";
import { sortShareBirthdays, sortBirthdaysName } from "../../../utils/general";
import { useState } from "react";

// Components
import SharedBirthdayCard from "../BirthdayCard/SharedBirthdayCard";
import ContentCard from "../ContentCard/ContentCard"
import Input from "../../UI/Library/Input/Input";

// MUI
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./list.module.scss";
import Logo from "../../../assets/images/logos/logo.svg";

const SharedBirthdaysList = ({ birthdays, share }) => {
    // State
    const [searchResults, setSearchResults] = useState([]);


    let sortedBirthdays = []
    if (share) {
        sortedBirthdays = birthdays && sortBirthdaysName(birthdays);
    } else {
        sortedBirthdays = birthdays && sortShareBirthdays(birthdays);
    }

    // Handlers
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const matches = birthdays.filter(birthday => birthday.name.toLowerCase().includes(searchTerm));
        console.log(matches)

        if (matches.length > 0) {
            setSearchResults(matches)
        } else {
            setSearchResults([])
        }
    }

    if (sortedBirthdays) {
        return (
            <>
                {share ? <Input
                    type="text"
                    placeholder="Search a Friends's Name"
                    onChange={handleSearch}
                />
                    : null}
                <Grid container spacing={3} className={styles.grid} >
                    {sortedBirthdays && sortedBirthdays.length > 0 ?
                        share && searchResults.length > 0
                            ? searchResults.map(birthday => (
                                <Grid item xs={12} sm={6} lg={4} key={uuid()}>
                                    <SharedBirthdayCard birthday={birthday} />
                                </Grid>
                            ))
                            : sortedBirthdays.map(birthday => (
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
            </>
        )
    }
    return null
}

export default SharedBirthdaysList
