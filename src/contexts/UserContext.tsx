import React, { createContext, useState, useEffect } from "react";
import { UserStructure } from "../types";
import { randomUser } from "../utils/api";

interface UserContextProps {
    user: UserStructure | null;
    setUser: (user: UserStructure | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => void 0,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    useEffect(() => {
        setUser(randomUser);
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};