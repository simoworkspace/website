import React, { createContext, useState, useEffect } from "react";
import { UserStructure } from "../types";
import api from "../utils/api";
import Cookies from "js-cookie";

interface UserContextProps {
    user: UserStructure | null;
    setUser: (user: UserStructure | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => void 0,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    const getUserData = async () => {
        if (Cookies.get("discordUser")) {
            const { data } = await api.getUserData();

            if (data) {
                setUser(data);
            } else {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
