import { createContext, useRef } from "react";

export const SelectedContext = createContext(null);

export const SelectedProvider = ({ children }) => {

    // State
    const selected = useRef([])

    // Handlers
    const getSelected = () => {
        return selected.current
    }

    const addSelected = (item) => {
        selected.current = [...selected.current, item]
    }

    const removeSelected = (itemToRemove) => {
        selected.current = selected.current.filter(item => item.id !== itemToRemove.id);
    }

    const clearSelected = () => {
        selected.current = []
    }


    return (
        <SelectedContext.Provider value={{ addSelected, removeSelected, getSelected, clearSelected }}>
            { children}
        </SelectedContext.Provider>
    );
}
