import { useContext } from "react";
import { buttonColor } from "../../utils/theme/button";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Button: React.FC<{ action?: () => void; name: string; clas?: string; }> = ({ clas, name, action }) => {
    const { color } = useContext(ThemeContext)
    
    return (
        <button onClick={action} className={`${buttonColor[color]} border-2 transition-all duration-300 w-full text-white p-3 rounded-lg ${clas}`}>{name}</button>
    )
};