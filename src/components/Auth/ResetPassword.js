import { useContext, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory, Link } from "react-router-dom";
import { validateForm } from "../../utils/general"

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page"
import Button from "../UI/Library/Button/Button";
import Input from "../UI/Library/Input/Input";

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Styles, Media
import styles from "./auth.module.scss";
import Logo from "../../assets/images/logos/logo.svg";

export default function ResetPassword() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { resetPassword } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();
    const formRef = useRef();

    // Handlers
    const handlePasswordReset = (e) => {
        showLoader("Sending Password Reset Email")

        if (!validateForm(e, formRef.current)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const email = emailRef.current.value.toLowerCase().trim();

        resetPassword(email)
            .then(data => {
                hideLoader()
                enqueueSnackbar(`Password Reset Link Sent!`, {
                    variant: 'success',
                });
                return history.push('/signin')
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar("Error sending password reset link", {
                    variant: 'error',
                });
            })
    }


    return (
        <Page
            title="Reset Password"
            center
            fullscreen
        >
            <Container maxWidth="xs">
                <div className={styles.auth} >
                    <img src={Logo} alt="" />
                    <div className={styles.heading}>
                        <h1>Reset Password</h1>
                        <h2>Oops...</h2>
                    </div>
                    <form name="reset-password-form" ref={formRef}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Input
                                    inputRef={emailRef}
                                    label="Email"
                                    type="email"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth onClick={handlePasswordReset}>Reset Password</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container justify="center" className={styles.options}>
                        <Link to="/signin">Sign In</Link>
                    </Grid>
                </div>
            </Container>
        </Page>
    )
}
