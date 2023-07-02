import React, { useEffect, useState } from "react";
import api from "../api";

export const RequireAuth: React.FC<{ children: any }> = ({ children }) => {
    const [auth, setAuth] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            await api.getUserData();
            return setAuth(true); 
        } catch(error: any) {
            return setAuth(false);
        }
    };

    useEffect(() => { getUserData(); }, []);

    if (!auth) return window.location.href = "/";
    
    return <>{children}</>;
};
