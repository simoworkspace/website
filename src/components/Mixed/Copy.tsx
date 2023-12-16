import { FC, useContext, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";

export const CopyButton: FC<{ text: string; name: string }> = ({ text, name }) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const { color } = useContext(ThemeContext);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);

        setCopied(true);
    };

    return (
        <div className="relative">
            <button onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)} onClick={handleCopy} className="">
                <BiCopy size={20} />
            </button>
            <div>
                {show && (
                    <div className={`absolute ${show && "w-28"} bg-neutral-800 p-3 border-2 rounded-lg text-center text-sm ${borderColor[color]}`}>{copied ? `${name} copiado` : "Copiar"}</div>
                )}
            </div>
        </div>
    );
};