import { useEffect, useState, FC } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 

export const Auth: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            if (Cookies.get("discordUser")) {
                const { data } = await api.getUserData();
                setAuth(data && true);
            } else {
                setAuth(false);
            }
        } catch {
            setAuth(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (auth === false) {
            navigate("/login");
        }
    }, [auth, navigate]);

    if (loading) {
        return (
            <div className="text-white max-w-[1500px] w-screen h-full">
                <div className="gap-3 flex justify-center items-center h-full text-2xl font-bold">
                    <AiOutlineLoading3Quarters className="animate-spin"/>
                    <span>Verificando usuário...</span>
                </div>
            </div>
        );
    }

    if (auth === null) {
        return null;
    }

    return <>{children}</>;
};
