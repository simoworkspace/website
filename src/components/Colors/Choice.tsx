import { ThemeContext } from "../../contexts/ThemeContext";
import { ThemeContextProps, Theme, ThemeStructure } from "../../types";
import { useContext } from "react";

interface ButtonProps {
    name: string;
    theme: Theme;
    margin?: string;
    selected: boolean;
};

export const ChoiceColor: React.FC<ButtonProps> = ({ name, theme, margin, selected }) => {
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const themesOptions: ThemeStructure = {
        black: "bg-[#2e2e2e]",
        blue: "bg-[#004d7c]",
        green: "bg-[#04484d]",
        purple: "bg-[#2B195C]",
        red: "bg-[#802222]"
    }

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return (
        <button onClick={() => toggleTheme(theme)} className={`${selected ? "bg-[#3a3a3a]" : null} hover:bg-[#3a3a3a] rounded-md ${margin === "6px" ? "m-[6px]" : "m-0"} transition-all`}>
            <div className="flex gap-2 flex-row items-center justify-center">
                <div className="flex items-center justify-start">
                    <div className={`w-3 h-3 ${themesOptions[theme]} rounded-full justify-start`}></div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <div>{name}</div>
                </div>
            </div>
        </button>
    );
};