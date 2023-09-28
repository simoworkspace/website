import React, { PropsWithChildren, useEffect, useState } from "react";
import api from "../utils/api";
import { UserStructure } from "../types";
import { AxiosResponse } from "axios";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<boolean>(true);

    const getUserData = async () => {
        const userData: AxiosResponse<UserStructure> = await api.getUserData();

        if (userData.data.signed) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    };

    useEffect(() => { getUserData(); }, []);

    if (!auth) {
        window.location.href = "/";
    }

    return <>{children}</>;
};
