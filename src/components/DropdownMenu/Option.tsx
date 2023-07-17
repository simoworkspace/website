import React from "react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    to?: string;
    icon: string;
    type: "button" | "link";
    alt: string;
    action?: () => Promise<void>;
    fix?: boolean
};

export const MenuOption: React.FC<Props> = ({ icon, title, to, alt, action, type, fix }) => {
    return type === "link" ? (
        <Link to={to || "/"} className="p-1 text-white flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all">
            <div className="flex-2 flex">
                <img className="mr-3" src={icon} alt={alt} />
                <span className={fix ? "w-[100px] text-center" : ""}>{title}</span>
            </div>
        </Link>
    ) : (
        <button onClick={action} className="p-1 flex text-white justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all">
            <div className="flex-2 flex">
                <img className="mr-3" src={icon} alt={alt} />
                <span className={fix ? "w-[100px] text-center" : ""}>{title}</span>
            </div>
        </button>
    )
};