import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";

export const LoginButton: React.FC = () => {
    const { color } = useContext(ThemeContext);

    return (
        <div className="flex mr-10 text-white xl:hidden">
            <a className={`${buttonColor[color]} duration-300 transtion-colors py-4 px-6 rounded-lg border-2 flex items-center h-[50px]`} href={import.meta.env.VITE_AUTH_LINK as string}>
                <span>Login</span>
            </a>
        </div>
    )
};