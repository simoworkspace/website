import React, { useEffect, useState } from "react";
interface Props {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<boolean>(true);

    useEffect(() => {
        const getUserData = (): void => {
            const userCookie: string | undefined =
                document.cookie.split("discordUser=")[1];
            userCookie ? setAuth(true) : setAuth(false);
        };

        getUserData();
    }, []);

    console.log(auth);

    if (!auth) {
        window.location.href = '/';
    }

    return <>{children}</>;
};
