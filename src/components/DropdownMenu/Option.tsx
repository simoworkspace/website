import React from "react";
import { Link } from "react-router-dom";
import * as iconMD from "react-icons/md";
interface Props {
    title: string;
    to?: string | "/";
    icon: string;
    type: "button" | "link";
    mobile?: boolean;
    alt: string;
    action?: () => void | JSX.Element |Promise<void | Element>;
    fix?: boolean;
    selected?: boolean;
};

export const MenuOption: React.FC<Props> = ({ icon, title, to, alt, action, type, fix, mobile, selected }) => {
    return mobile ? (type === "button" ? (
        <button onClick={action} className="hover:bg-neutral-700 flex flex-row items-center justify-center gap-2 rounded-lg bg-black">
            <img src={icon} alt={alt} />
            <span>{title}</span>
            <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300`} size={25} />
        </button>
    ) : (
        <Link to={to || "/"} className="hover:bg-neutral-700 flex flex-row items-center justify-center gap-2 rounded-lg bg-black w-full h-[30px]">
            <img src={icon} alt={alt} />
            <span>{title}</span>
            <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 rotate-0`} size={25} />
        </Link>
    )
    ) :
        (type === "link" ? (
            <Link to={to || "/"} className={`p-1 text-white flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all ${selected ? "bg-[#3a3a3a]" : "bg-black"}`}>
                <div className="flex-2 flex">
                    <img className="mr-3" src={icon} alt={alt} />
                    <span className={fix ? "w-[100px] text-center" : ""}>{title}</span>
                </div>
            </Link>
        ) : (
            <button onClick={action} className={`p-1 flex text-white justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all ${selected ? "bg-[#3a3a3a]" : "bg-black"}`}>
                <div className="flex-2 flex">
                    <img className="mr-3" src={icon} alt={alt} />
                    <span className={fix ? "w-[100px] text-center" : ""}>{title}</span>
                </div>
            </button>
        )
    )
};