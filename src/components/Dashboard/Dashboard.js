import Page from "../UI/Page/Page";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"

const Dashboard = () => {
    const { signOut } = useContext(UserContext);

    return (
        <Page>
            <h1>Dashboard</h1>
            <button onClick={signOut}>Logout</button>
        </Page>
    )
}

export default Dashboard
