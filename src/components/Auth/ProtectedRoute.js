import { Route } from "react-router-dom";
import withAuth from "../HOC/withAuth"

const ProtectedRoute = (props) => {
    return (
        <Route {...props}>
            {props.children}
        </Route>
    )
}

export default withAuth(ProtectedRoute)
