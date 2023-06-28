import axios from "axios";
import React, { useEffect, useState } from "react";
interface Props {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<boolean>(true);

    useEffect(() => {
        const getUserData = async () => {
            const getUserData = () => {
                axios.get("/api/auth/user", {
                        withCredentials: true,
                        headers: {
                            Authorization: import.meta.env.VITE_API_KEY,
                        },
                    })
                    .then((res) => {
                        setAuth(true)
                    }).catch((error) => {
                        setAuth(false)
                    })
            };
            getUserData();
        };

        getUserData();
    }, []);

    console.log(auth);

    if (!auth) {
        window.location.href = '/';
    }

    return <>{children}</>;
};
