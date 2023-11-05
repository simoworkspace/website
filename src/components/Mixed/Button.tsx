import { useContext } from "react";
import { buttonColor } from "../../utils/theme/button";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

export const Button: React.FC<{
    action?: (() => void) | (() => Promise<void>); 
    clas?: string; 
    children: React.ReactNode;
    type?: "button" | "reset" | "submit"
    link?: boolean;
    to?: string
    disabled?: boolean;
}> = ({ clas, action, children, type, link, to, disabled }) => {
    const { color } = useContext(ThemeContext)
    
    return link ? (
        <Link to={to || "/"} className={`${buttonColor[color]} border-2 transition-all duration-300 w-full text-white p-3 rounded-lg ${clas}`}>{children}</Link>
    ) : (
        <button disabled={disabled} type={type} onClick={action} className={`${buttonColor[color]} border-2 transition-all duration-300 text-white p-3 rounded-lg ${clas}`}>{children}</button>
    )
};