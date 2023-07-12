import { ThemeContext } from "../../contexts/ThemeContext";
import { ThemeContextProps, Theme } from "../../types";
import { useContext } from "react";

interface ButtonProps {
    name: string;
    color: string;
    theme: Theme;
};

export const ChoiceColor: React.FC<ButtonProps> = ({ name, color, theme }) => {
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return (
        <button onClick={() => toggleTheme(theme)} className="hover:bg-[#3a3a3a] rounded-md m-[6px] transition-all">
            <div className="flex gap-2 flex-row items-center justify-center">
                <div className="flex items-center justify-start">
                    <div className={`w-3 h-3 bg-[${color}] rounded-full justify-start`}></div>
                </div>
                <div className="flex items-center justify-center w-[100%]">
                    <div>{name}</div>
                </div>
            </div>
        </button>
    );
};