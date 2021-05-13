// Components
import Input from "../../UI/Library/Input/Input";
import Button from "../../UI/Library/Button/Button";


// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./add.module.scss"
import profile from "../../../assets/icons/custom/profile.svg";


const AddBirthday = () => {
    return (
        <section className={styles.add}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <Container>
                    <div className={styles.top}>
                        <h1>Add a Birthday</h1>
                        <img src={profile} alt="" />
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Name"
                                type="text"
                                required
                            />
                        </Grid>
                        <Grid item xs={8} md={4}>
                            <Input
                                label="Birthday"
                                type="date"
                                required
                            />
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Input
                                label="Year"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Notes"
                                type="text"
                                textArea={4}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <div className={styles.button}>
                    <Button
                        fullWidth
                    >
                        + Save Birthday
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default AddBirthday
