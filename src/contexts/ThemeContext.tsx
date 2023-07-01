import React, { createContext, useEffect, useState } from "react";
import { ThemeContextProps, Theme } from "../types";

export const ThemeContext = createContext<ThemeContextProps>({
    color: "blue",
    changeTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: any }> = ({ children }) => {
    const [color, setTheme] = useState<Theme>("blue");

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && savedTheme !== color) return setTheme(savedTheme as Theme);
    }, []);

    return <ThemeContext.Provider value={{ color, changeTheme }}>{children}</ThemeContext.Provider>
};
