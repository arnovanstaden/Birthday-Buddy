// Context
import { UserProvider } from "../../context/UserContext";
import { LoaderProvider } from "../../context/LoaderContext";

// Components
import NotificationsProvider from "../UI/Notifications/Notifications";
import Router from "./Router";

// MUI
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"

const AppWrap = ({ children }) => {
    return (
        <UserProvider>
            <LoaderProvider>
                <NotificationsProvider>
                    <StylesProvider injectFirst>
                        <Router>
                            <CssBaseline />
                            {children}
                        </Router>
                    </StylesProvider>
                </NotificationsProvider>
            </LoaderProvider>
        </UserProvider>
    )
}

export default AppWrap
