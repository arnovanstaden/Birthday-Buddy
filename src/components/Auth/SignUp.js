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

export default function SignUp() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { signUp, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();
    const displayNameRef = useRef();
    const formRef = useRef();

    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            return history.push('/')
        }
    }, []);


    // Handlers
    const handleAuth = async (e) => {

        if (!validateForm(e, formRef.current)) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // PW Confirm
        if (passwordRef.current.value !== passwordConfRef.current.value) {
            return enqueueSnackbar("Please ensure your passwords match", {
                variant: 'error',
            });
        }


        showLoader("Creating Your Profile")

        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase().trim(),
            password: passwordRef.current.value,
            displayName: displayNameRef.current.value.trim(),
        }

        // Password Length
        if (authData.password.length < 6) {
            hideLoader()
            return enqueueSnackbar("Your password needs to be at least 6 characters long.", {
                variant: 'error',
            });
        }

        signUp(authData)
            .then(result => {
                hideLoader();
                enqueueSnackbar(`Welcome to Birthday Buddy ${result.displayName}!`, {
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
            title="Sign Up"
            center
            fullscreen
        >
            <Container maxWidth="sm">
                <div className={styles.auth}>
                    <img src={Logo} alt="" />
                    <div className={styles.heading}>
                        <h1>Sign Up</h1>
                        <h2>Welcome</h2>
                    </div>
                    <form name="signup-form" ref={formRef}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    required
                                    type="text"
                                    label="Username"
                                    inputRef={displayNameRef}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    inputRef={emailRef}
                                    label="Email"
                                    type="email"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Input
                                    inputRef={passwordRef}
                                    label="Password"
                                    type="password"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    inputRef={passwordConfRef}
                                    label="Password Confirmation"
                                    type="password"
                                    required
                                />
                            </Grid>
                            <Button fullWidth onClick={handleAuth}>Sign Up</Button>
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
