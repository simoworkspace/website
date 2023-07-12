import { ThemeContext } from "../../contexts/ThemeContext";
import { ThemeContextProps, Theme } from "../../types";
import { useContext } from "react";

interface ButtonProps {
    name: string;
    theme: Theme;
    margin?: string
};

export const ChoiceColor: React.FC<ButtonProps> = ({ name, theme, margin }) => {
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return (
        <button onClick={() => toggleTheme(theme)} className={`hover:bg-[#3a3a3a] rounded-md ${margin === "6px" ? "m-[6px]" : "m-0"} transition-all`}>
            <div className="flex gap-2 flex-row items-center justify-center">
                <div className="flex items-center justify-start">
                    <div className={`w-3 h-3 
                        ${theme === "blue" && "bg-[#004d7c]"} 
                        ${theme === "green" && "bg-[#04484d]"} 
                        ${theme === "red" && "bg-[#802222]"} 
                        ${theme === "purple" && "bg-[#2B195C]"} rounded-full justify-start`}></div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <div>{name}</div>
                </div>
            </div>
        </button>
    );
};