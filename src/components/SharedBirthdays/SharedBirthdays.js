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
import styles from "./shared.module.scss";

const SharedBirthdays = () => {

    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    return (
        <Page
            className={styles.shared}
            fullWidth
        >
            <Nav />
            <Container>

            </Container>
        </Page>
    )
}

export default SharedBirthdays
