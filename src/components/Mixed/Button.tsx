import { useContext } from "react";
import { buttonColor } from "../../utils/theme/button";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Button: React.FC<{
    action?: () => void; 
    clas?: string; 
    children: React.ReactNode;
    type?: "button" | "reset" | "submit"
}> = ({ clas, action, children, type }) => {
    const { color } = useContext(ThemeContext)
    
    return (
        <button type={type} onClick={action} className={`${buttonColor[color]} border-2 transition-all duration-300 w-full text-white p-3 rounded-lg ${clas}`}>{children}</button>
    )
};