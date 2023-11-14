import { PropsWithChildren, useEffect, useState, FC } from "react";
import api from "../../utils/api";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Auth: FC<{ children: React.ReactNode }> = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<boolean | null>(null);
    const navigate: NavigateFunction = useNavigate();

    const getUserData = async () => {
        try {
            const { data: { signed } } = await api.getUserData();
            setAuth(signed);
        } catch {
            setAuth(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (auth === false) {
            navigate("/");
        }
    }, [auth, navigate]);

    if (auth === null) {
        return null;
    }

    return <>{children}</>;
};
