import { createContext, useState } from "react";

import Loader from "../components/UI/Loader/Loader"

// MUI
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';

export const LoaderContext = createContext(null);

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1
    },
}));


export const LoaderProvider = ({ children }) => {

    const classes = useStyles();

    // State
    const [show, setShow] = useState(false);
    const [text, setText] = useState("")

    const showLoader = (loaderText) => {
        setShow(true);
        setText(loaderText)
    };

    const hideLoader = () => {
        setShow(false)
    };

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            <Backdrop className={`${classes.backdrop} loader`} open={show}>
                <Loader text={text} />
            </Backdrop>
            { children}
        </LoaderContext.Provider>
    );
}
