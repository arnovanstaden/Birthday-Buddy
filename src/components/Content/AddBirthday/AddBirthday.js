import { useContext, useRef } from "react";
import { useSnackbar } from 'notistack';
import { addBirthday } from "../../../utils/birthdays";
import { validateForm } from "../../../utils/general";


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


const AddBirthday = ({ toggle, addBirthdayUI }) => {

    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const formRef = useRef();
    const profilePictureRef = useRef()
    const monthRef = useRef();

    // Handlers
    const handleAddBirthday = async (e) => {

        if (!validateForm(e, formRef.current)) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }
        showLoader("Saving Birthday")

        // Build Data
        const data = {}
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);
        const profilePicture = profilePictureRef.current.files[0];
        data.profilePicture = profilePicture ? profilePicture : null

        addBirthday(data)
            .then(result => {
                hideLoader();
                toggle();
                addBirthdayUI(result.birthday)
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

    const handlePictureUpload = () => {
        profilePictureRef.current.click()
    }

    return (
        <section className={styles.add}>
            <div className={styles.overlay} onClick={toggle}></div>
            <div className={styles.content}>
                <Container>
                    <div className={styles.top}>
                        <h1>Add a Birthday</h1>
                        <div className={styles.image}>
                            <img src={profile} alt="Profile" onClick={handlePictureUpload} />
                            <input ref={profilePictureRef} type="file" accept="image/x-png,image/jpeg,image/jpg" />
                        </div>
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
                            <Grid item xs={12} md={6}>
                                <Input
                                    label="Birthday"
                                    type="date"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    label="Notes"
                                    type="text"
                                    textArea={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={handleAddBirthday}
                                    fullWidth
                                >
                                    Save Birthday
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>

            </div>
        </section>
    )
}

export default AddBirthday
