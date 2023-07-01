import React, { createContext, useState, useEffect } from "react";
import { UserStructure } from "../types";
import api from "../api";
import { AxiosResponse } from "axios";

interface UserContextProps {
    user: UserStructure | null;
    setUser: (user: UserStructure | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC<{ children: any }> = ({
    children,
}: React.PropsWithChildren) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            const res: AxiosResponse<{ data: UserStructure }> = await api.getUserData();
            setUser(res.data.data);
        };

        getUserData();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
