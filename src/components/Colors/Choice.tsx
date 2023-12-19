import { ThemeContext } from "../../contexts/ThemeContext";
import { ThemeContextProps, Theme, ThemeStructure } from "../../types";
import { useContext } from "react";

interface ButtonProps {
    name: string;
    theme: Theme;
    margin?: string;
    selected: boolean;
    mobile?: boolean;
};

export const ChoiceColor: React.FC<ButtonProps> = ({ name, theme, margin, selected, mobile }) => {
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const themesOptions: ThemeStructure = {
        black: "bg-[#2e2e2e]",
        blue: "bg-[#004d7c]",
        green: "bg-[#04484d]",
        purple: "bg-[#2B195C]",
        red: "bg-[#802222]",
        orange: "bg-[#802222]",
        christmas: "bg-[#034F1B]"
    }

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return mobile ? (
        <button onClick={() => toggleTheme(theme)} className={`${selected ? "bg-[#3a3a3a]" : null} hover:bg-[#3a3a3a] rounded-md ${margin === "6px" ? "m-[6px]" : "m-0"} transition-all px-2`}>
            <div className="flex gap-2 flex-row items-center justify-center w-[120px] h-[27px]">
                <div className="flex items-center justify-start">
                    <div className={`w-3 h-3 ${themesOptions[theme]} rounded-full justify-start`}></div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <div>{name}</div>
                </div>
            </div>
        </button>
    ) : (
        <button onClick={() => toggleTheme(theme)} className={`${selected ? "bg-[#3a3a3a]" : null} hover:bg-[#3a3a3a] rounded-md ${margin === "6px" ? "m-[6px]" : "m-0"} transition-all p-1`}>
            <div className="flex gap-4 flex-row items-center justify-center">
                <div className="flex items-center justify-start">
                    <div className={`w-3 h-3 ${themesOptions[theme]} rounded-full justify-start`}></div>
                </div>
                <div className="flex items-center justify-start w-full">
                    <div>{name}</div>
                </div>
            </div>
        </button>
    );
};