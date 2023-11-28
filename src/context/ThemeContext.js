"use client"

import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem("mode");
        return value || "light";
    }
};

export const ThemeContextProvider = ({children}) => {
    const [mode, setMode] = useState(() => {
        return getFromLocalStorage();
    });

    const toggle = () => {
        setMode(mode === "light" ? "dark" : "light");
    }

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{toggle, mode}}>
            {children}
        </ThemeContext.Provider>
    )
}