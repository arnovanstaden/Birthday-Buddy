import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";

const Router = ({ children }) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {/* <Nav /> */}
                    <Dashboard />
                </Route>
                <Route path="/birthday/:id">
                    <Profile />
                </Route>

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

export default Router
