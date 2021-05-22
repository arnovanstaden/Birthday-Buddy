import ClassNames from "classnames";
import { getCardFormatBirthday } from "../../../utils/general";
import { useContext, useState } from "react"

// Context
import { SelectedContext } from "../../../context/SelectedContext";

// Components
import Card from "../../UI/Library/Card/Card";

// MUI
import Checkbox from '@material-ui/core/Checkbox';


// Styles & Images
import styles from "./card.module.scss";
import EmptyProfileImg from "../../../assets/images/other/emptyProfile.png";

const SharedBirthdayCard = ({ birthday, today }) => {
    // Config
    const birthDate = new Date(birthday.date);
    const { addSelected, removeSelected, getSelected } = useContext(SelectedContext);
    const classes = ClassNames(
        styles.card,
        styles.shared
    )

    // State
    const [checked, setChecked] = useState(getSelected().includes(birthday))

    // Handlers
    const onChangeHandler = (e) => {
        if (e.target.checked) {
            setChecked(true)
            addSelected(birthday)
        } else {
            setChecked(false)
            removeSelected(birthday)
        }
    }

    return (
        <Card className={classes}>
            <div className={styles.content}>
                <Checkbox
                    checked={checked}
                    onChange={onChangeHandler}
                    classes={{
                        checked: styles.checkbox
                    }}
                />
                <div className={styles.image}>
                    <img src={birthday.profilePictureUrl || EmptyProfileImg} alt="Profile" />
                </div>
                <div className={styles.text}>
                    <h1>{birthday.name}</h1>
                    <div className={styles.bottom}>
                        <p>{getCardFormatBirthday(birthDate)}</p>
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default SharedBirthdayCard
