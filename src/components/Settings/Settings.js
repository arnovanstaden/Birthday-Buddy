import { useContext, useState, useEffect } from "react";

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Page/Page";
import Button from "../UI/Library/Button/Button";
import Nav from "../UI/Nav/Nav";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./settings.module.scss";


const Settings = () => {
    return (
        <Page
            className={styles.dashboard}
            fullWidth
        >
            <Nav />
            <Container>
                <h1>Settings</h1>
            </Container>
        </Page>
    )
}

export default Settings
