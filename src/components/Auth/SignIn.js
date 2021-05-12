import { useContext, useRef, useEffect } from 'react';
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

export default function SignIn() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { signIn, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const formRef = useRef();

    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            return history.push('/')
        }
    }, []);


    // Handlers
    const handleAuth = (e) => {
        showLoader("Signing You In")

        if (!validateForm(e, formRef.current)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase().trim(),
            password: passwordRef.current.value,
        }

        signIn(authData)
            .then(result => {
                hideLoader();
                enqueueSnackbar(`Welcome back ${result.displayName}!`, {
                    variant: 'success',
                });
                return history.push('/')
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })
    }


    return (
        <Page
            title="Sign In"
            center
            fullscreen
        >
            <Container maxWidth="xs">
                <div className={styles.auth}>
                    <img src={Logo} alt="" />
                    <div className={styles.heading}>
                        <h1>Sign In</h1>
                        <h2>Welcome</h2>
                    </div>
                    <form name="signin-form" ref={formRef}>
                        <Grid container required>
                            <Grid item xs={12}>
                                <Input
                                    autoFocus
                                    inputRef={emailRef}
                                    label="Email"
                                    type="email"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    inputRef={passwordRef}
                                    label="Password"
                                    type="password"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth onClick={handleAuth}>Sign In</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container justify="space-between" className={styles.options}>
                        <Link to="/resetpassword">Reset Password</Link>
                        <Link to="/signup">Sign Up</Link>
                    </Grid>
                </div>
            </Container >
        </Page >
    )
}
