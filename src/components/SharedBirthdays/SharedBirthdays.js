import { useContext, useState, useEffect } from "react";
import { getAllSharedBirthdays, deleteSharedBirthdays } from "../../utils/sharing";
// Context
import { LoaderContext } from "../../context/LoaderContext";
import { SelectedProvider, SelectedContext } from "../../context/SelectedContext";

// Components
import Page from "../UI/Page/Page";
import Button from "../UI/Library/Button/Button";
import Nav from "../UI/Nav/Nav";
import SharedBirthdaysList from "../Content/BirthdayLists/SharedBirthdaysList";
import Modal from '../UI/Modal/Modal';

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./shared.module.scss";

const SharedBirthdaysInner = () => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const { getSelected } = useContext(SelectedContext);

    // State
    const [sharedBirthdays, setSharedBirthdays] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Hooks
    useEffect(() => {
        if (!sharedBirthdays) {
            showLoader("Fetching Birthdays Shared with You");
            getAllSharedBirthdays()
                .then(result => {
                    setSharedBirthdays(result);
                    hideLoader()
                })
        } else {
            hideLoader()
        }
    }, [sharedBirthdays]);

    // Handlers 

    const handleImport = () => {
        if (getSelected().length < 1) {
            return alert("Please select at least 1 birthday to import first.")
        }
    }

    const handleShowDeleteModal = () => {
        if (getSelected().length < 1) {
            return alert("Please select at least 1 birthday to delete first.")
        }
        return setShowDeleteModal(true)
    }

    const handleDelete = () => {
        setShowDeleteModal(false)
        showLoader("Deleting Birthdays...")
        // Remove from firebase
        deleteSharedBirthdays(getSelected()).then((result) => {
            console.log(result);
            // Remove from UI
            setSharedBirthdays(prev => prev.filter(item => !getSelected().includes(item)))
            hideLoader()
        })
    }

    return (
        <Page
            className={styles.shared}
            fullWidth
        >
            <Nav />
            <Container>

                <section>
                    <h2>Birthdays Shared With You</h2>
                    <SharedBirthdaysList birthdays={sharedBirthdays} />
                </section>

                <div className={styles.options}>
                    <Button onClick={handleImport}>
                        Import
                    </Button>
                    <Button onClick={handleShowDeleteModal} hollow>
                        Delete
                    </Button>
                </div>
            </Container>

            <Modal status={showDeleteModal}
                content={{
                    heading: "Are you sure?",
                    text: getSelected().length > 1 ? "If you delete these birthdays, the data will be lost forever." : "If you delete this birthday, the data will be lost forever."
                }}>
                <Button onClick={handleDelete}>
                    Delete
                        </Button>
                <Button onClick={() => setShowDeleteModal(false)} hollow>
                    Cancel
                    </Button>
            </Modal>

        </Page >
    )
}

const SharedBirthdays = () => {
    return (
        <SelectedProvider>
            <SharedBirthdaysInner />
        </SelectedProvider>
    )
}

export default SharedBirthdays
