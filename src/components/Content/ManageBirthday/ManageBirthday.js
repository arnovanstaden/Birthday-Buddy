import { useContext, useRef } from "react";
import { useSnackbar } from 'notistack';
import { addBirthday, editBirthday } from "../../../utils/birthdays";
import { validateForm, resizeProfilePicture } from "../../../utils/general";

// Components
import Input from "../../UI/Library/Input/Input";
import Button from "../../UI/Library/Button/Button";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fade from '@material-ui/core/Fade';

// Styles & Images
import styles from "./manage.module.scss"
import profile from "../../../assets/icons/custom/profile.svg";


const AddBirthday = ({ open, toggle, addBirthdayUI, editBirthdayState, birthday }) => {

    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const formRef = useRef();
    const profilePictureRef = useRef();
    const profilePictureInputRef = useRef();

    // Handlers
    const handleAddBirthday = async (e) => {

        if (!validateForm(e, formRef.current)) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Build Data
        const data = {}
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);
        const profilePicture = profilePictureInputRef.current.files[0];
        if (profilePicture) {
            const resizedPicture = await resizeProfilePicture(profilePicture);
            data.profilePicture = resizedPicture
        } else {
            data.profilePicture = null
        }

        showLoader("Saving Birthday")
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

    const handleEditBirthday = async (e) => {
        if (!validateForm(e, formRef.current)) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }
        showLoader("Saving Birthday")

        // Build Data
        const data = {
            id: birthday.id
        }
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => data[key] = value);
        const profilePicture = profilePictureInputRef.current.files[0];

        if (profilePicture) {
            const resizedPicture = await resizeProfilePicture(profilePicture);
            data.profilePicture = resizedPicture
        } else if (birthday.profilePictureUrl) {
            data.profilePictureUrl = birthday.profilePictureUrl
        } else {
            data.profilePicture = null
        }

        editBirthday(data)
            .then(result => {
                hideLoader();
                toggle();
                editBirthdayState(result.data);
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
        profilePictureInputRef.current.click()
    }

    const handleImageSelect = () => {
        const image = URL.createObjectURL(profilePictureInputRef.current.files[0]);
        if (image) {
            profilePictureRef.current.src = image
        }
    }

    return (
        <>
            <Fade in={open} timeout={500}>
                <section className={styles.add}>
                    <div className={styles.overlay} onClick={toggle}></div>
                    <div className={styles.content}>
                        <Container>
                            <div className={styles.top}>
                                <h1>{!birthday ? "Add a" : "Edit"} Birthday</h1>
                                <div className={styles.image}>
                                    <img src={birthday && birthday.profilePictureUrl ? birthday.profilePictureUrl : profile} alt="Profile" onClick={handlePictureUpload} ref={profilePictureRef} />
                                    <input ref={profilePictureInputRef} type="file" accept="image/x-png,image/jpeg,image/jpg" onChange={handleImageSelect} />
                                </div>
                            </div>
                            <form ref={formRef}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            label="Name"
                                            type="text"
                                            required
                                            defaultValue={birthday && birthday.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            label="Date"
                                            type="date"
                                            required
                                            defaultValue={birthday && birthday.date}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input
                                            label="Notes"
                                            type="text"
                                            textArea={4}
                                            defaultValue={birthday && birthday.notes}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={birthday ? handleEditBirthday : handleAddBirthday}
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

            </Fade>
        </>
    )
}

export default AddBirthday
