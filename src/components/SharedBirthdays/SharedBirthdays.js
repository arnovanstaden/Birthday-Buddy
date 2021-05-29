import { useContext, useState, useEffect, useRef } from "react";
import { getAllBirthdays } from "../../utils/birthdays";
import { getAllSharedBirthdays, deleteSharedBirthdays, importSharedBirthdays, shareBirthdays } from "../../utils/sharing";
import { useSnackbar } from 'notistack';
import { verifyUserExists } from "../../utils/user";


// Context
import { LoaderContext } from "../../context/LoaderContext";
import { SelectedProvider, SelectedContext } from "../../context/SelectedContext";

// Components
import Page from "../UI/Page/Page";
import Button from "../UI/Library/Button/Button";
import Nav from "../UI/Nav/Nav";
import SharedBirthdaysList from "../Content/BirthdayLists/SharedBirthdaysList";
import Modal from '../UI/Modal/Modal';
import Input from "../UI/Library/Input/Input";

// MUI
import Container from "@material-ui/core/Container";

// Styles
import styles from "./shared.module.scss";

const SharedBirthdaysInner = () => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const { getSelected, clearSelected } = useContext(SelectedContext);
    const { enqueueSnackbar } = useSnackbar();
    const emailRef = useRef();

    // State
    const [sharedBirthdays, setSharedBirthdays] = useState(undefined);
    const [allBirthdays, setAllBirthdays] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [tabOption, setTabOption] = useState("Import");

    // Hooks
    useEffect(() => {
        if (!sharedBirthdays) {
            showLoader("Fetching Birthdays Shared with You");
            getAllSharedBirthdays()
                .then(result => {
                    setSharedBirthdays(result);
                    hideLoader()
                })
            getAllBirthdays()
                .then(result => {
                    setAllBirthdays(result);
                    hideLoader()
                })
        } else {
            hideLoader()
        }
    }, [sharedBirthdays]);

    // Handlers 
    const handleTabChange = (e, tab) => {
        const tabs = Array.from(document.getElementsByClassName(styles.tab));
        tabs.forEach(tab => {
            tab.classList.remove(styles.active)
        })
        e.target.classList.add(styles.active);
        setTabOption(tab)
    }

    const handleImport = () => {
        if (getSelected().length < 1) {
            return enqueueSnackbar("Please select at least 1 birthday to import first.", {
                variant: 'error',
            });
        }
        showLoader("Importing Birthdays...")
        // Remove from firebase
        importSharedBirthdays(getSelected()).then((result) => {
            // Remove from UI
            setSharedBirthdays(prev => prev.filter(item => !getSelected().includes(item)))
            hideLoader();
            enqueueSnackbar(result.message, {
                variant: 'success',
            });
        }).catch(err => {
            console.log(err)
            hideLoader();
            return enqueueSnackbar(err.message, {
                variant: 'error',
            });
        })

    }

    const handleShowDeleteModal = () => {
        if (getSelected().length < 1) {
            return enqueueSnackbar("Please select at least 1 birthday to delete first.", {
                variant: 'error',
            });
        }
        return setShowDeleteModal(true)
    }



    const handleDelete = () => {
        setShowDeleteModal(false)
        showLoader("Deleting Birthdays...")
        // Remove from firebase
        deleteSharedBirthdays(getSelected()).then((result) => {
            // Remove from UI
            setSharedBirthdays(prev => prev.filter(item => !getSelected().includes(item)))
            hideLoader();
            enqueueSnackbar(result.message, {
                variant: 'success',
            });
        }).catch(err => {
            hideLoader();
            return enqueueSnackbar(err.message, {
                variant: 'error',
            });
        })
    }

    const handleShowShareModal = () => {
        if (getSelected().length < 1) {
            return enqueueSnackbar("Please select at least 1 birthday to share first.", {
                variant: 'error',
            });
        }
        return setShowShareModal(true)
    }



    const handleShare = () => {
        const shareEmail = emailRef.current.value.toLowerCase().trim();
        showLoader("Sharing Birthdays...")

        verifyUserExists(shareEmail).then(result => {
            setShowShareModal(false);
            shareBirthdays(result, getSelected()).then((result) => {
                clearSelected()
                hideLoader();
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
            }).catch(err => {
                hideLoader();
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })
        }).catch(err => {
            hideLoader()
            return enqueueSnackbar(err.message, {
                variant: 'error',
            });
        });
    }

    return (
        <Page
            className={styles.shared}
            fullWidth
        >
            <Nav />
            <Container>

                <section>
                    <h2>Share Birthdays</h2>
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${styles.active}`} onClick={(e) => handleTabChange(e, "Import")}>
                            Shared with You
                        </button>
                        <button className={styles.tab} onClick={(e) => handleTabChange(e, "Share")}>
                            Share with Others
                        </button>
                    </div>
                    {tabOption === "Import"
                        ? <SharedBirthdaysList birthdays={sharedBirthdays} />
                        : <SharedBirthdaysList birthdays={allBirthdays} share />
                    }
                </section>

                <div className={styles.options}>
                    {tabOption === "Import"
                        ? <>
                            <Button onClick={handleImport}>
                                Import
                            </Button>
                            <Button onClick={handleShowDeleteModal} hollow>
                                Delete
                            </Button>
                        </>
                        : <Button onClick={handleShowShareModal}>
                            Share
                        </Button>
                    }
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

            <Modal status={showShareModal}
                content={{
                    heading: "Enter User Email",
                    text: "Please enter the registered email of the user you wish to share birthdays with."
                }}>
                <Input
                    type="email"
                    autoFocus
                    inputRef={emailRef}
                />
                <Button onClick={handleShare}>
                    Share
                </Button>
                <Button onClick={() => setShowShareModal(false)} hollow>
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
