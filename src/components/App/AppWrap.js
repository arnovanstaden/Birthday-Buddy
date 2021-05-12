// Context
import { UserProvider } from "../../context/UserContext";
import { LoaderProvider } from "../../context/LoaderContext";

// Components
import NotificationsProvider from "../UI/Notifications/Notifications";
import Router from "./Router";

// MUI
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"

// Theme
// import { theme } from "../../styles/Theme/theme";


const AppWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <LoaderProvider>
                <NotificationsProvider>
                    <StylesProvider injectFirst>
                        {/* <ThemeProvider theme={theme} > */}
                        <Router>
                            <CssBaseline />
                            {children}
                        </Router>
                        {/* </ThemeProvider> */}
                    </StylesProvider>
                </NotificationsProvider>
            </LoaderProvider>
        </UserProvider>
    )
}

export default AppWrap
