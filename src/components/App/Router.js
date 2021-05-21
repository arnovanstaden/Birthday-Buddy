import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import ProtectedRoute from "../Auth/ProtectedRoute"
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import Notifications from "../Notifications/Notifications";
import Settings from "../Settings/Settings";

const Router = ({ children }) => {
    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute exact path="/">
                    <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute path="/notifications">
                    <Notifications />
                </ProtectedRoute>
                <ProtectedRoute path="/settings">
                    <Settings />
                </ProtectedRoute>
                <ProtectedRoute path="/birthday/:id">
                    <Profile />
                </ProtectedRoute>

                {/* Auth */}
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>

                {/* 404 */}
                <Route path="*">
                    <h1>Page Not Found</h1> {/* FIX THIS */}
                </Route>

            </Switch>
        </BrowserRouter>
    )
}

export default Router;
