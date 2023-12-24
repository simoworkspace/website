import { FC, ReactNode, useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";

export const Badge: FC<{ text: string, icon: ReactNode, type: "bug" | "dev" | "contributor" | "premium" }> = ({ text, icon, type }) => {
    const { color } = useContext(ThemeContext);
    const [show, setShow] = useState<boolean>(false);

    const badgeType: Record<typeof type, string> = {
        bug: "bg-[#a31202]",
        contributor: "bg-[#0048b5]",
        dev: "bg-[#00b533]",
        premium: "bg-[#7900ad]"
    };

    return (
        <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className={`${badgeType[type]} h-full p-2 rounded-lg w-8 items-center flex justify-center`}>
            <div className="relative">
                {icon}
                <div className={`${!show && "hidden"} top-7 absolute min-w-[140px] bg-neutral-800 p-3 border-2 rounded-lg text-center text-sm ${borderColor[color]}`}>
                    {text}
                </div>
            </div>
        </div>
    );
};