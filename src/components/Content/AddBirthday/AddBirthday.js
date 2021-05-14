import { useContext, useRef } from "react";
import { useSnackbar } from 'notistack';
import { addBirthday } from "../../../utils/birthdays";
import { validateForm } from "../../../utils/general"

// Components
import Input from "../../UI/Library/Input/Input";
import Button from "../../UI/Library/Button/Button";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles & Images
import styles from "./add.module.scss"
import profile from "../../../assets/icons/custom/profile.svg";


const AddBirthday = ({ toggle }) => {

    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const formRef = useRef();

    // Handlers
    const handleAddBirthday = (e) => {

        if (!validateForm(e, formRef.current)) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }
        showLoader("Saving Birthday")
        const data = {}
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);
        addBirthday(data)
            .then(result => {
                hideLoader();
                toggle();
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })
    }

    return (
        <section className={styles.add}>
            <div className={styles.overlay} onClick={toggle}></div>
            <div className={styles.content}>
                <Container>
                    <div className={styles.top}>
                        <h1>Add a Birthday</h1>
                        <img src={profile} alt="" />
                    </div>
                    <form ref={formRef}>
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
                    </form>
                </Container>
                <div className={styles.button}>
                    <Button
                        onClick={handleAddBirthday}
                        fullWidth
                    >
                        Save Birthday
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default AddBirthday
