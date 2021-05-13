import { createContext, useState, useEffect } from "react";
import { getAllBirthdays } from "../utils/birthdays"

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    // Config

    // State
    const [birthdays, setBirthdays] = useState(null);
    const [loading, setLoading] = useState(true);

    // Context Value
    const value = {
        birthdays,
    }

    // const getBirthdays = async() => {

    // }

    // Set user on Auth Change
    // useEffect(() => {
    //     console.log("fetching data");
    //     const result = await getAllBirthdays;
    //     console.log(result)

    // }, []);

    return (
        <DataContext.Provider
            value={value}>
            {children}
        </DataContext.Provider>
    );
}