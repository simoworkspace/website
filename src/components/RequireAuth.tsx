import React, { PropsWithChildren, useEffect, useState } from "react";
import api from "../utils/api";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            await api.getUserData();
            return setAuth(true);
        } catch (error: any) {
            return setAuth(false);
        }
    };

    useEffect(() => { getUserData(); }, []);

    if (!auth) {
        window.location.href = "/";
    }

    return <>{children}</>;
};
