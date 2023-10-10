import React, { createContext, useEffect, useState } from "react";
import { ThemeContextProps, Theme } from "../types";

export const ThemeContext = createContext<ThemeContextProps>({
    color: "purple",
    changeTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }: React.PropsWithChildren) => {
    const [color, setTheme] = useState<Theme>("purple");

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
