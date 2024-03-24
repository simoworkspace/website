import { FC, useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        setTimeout(() => {
            setCopied(false);
        }, 5_000);
    }, [show, copied]);
    
    return (
        <div className="relative">
            <button onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)} onClick={handleCopy} className="">
                <BiCopy size={20} />
            </button>
            <div>
                {show && <div className={`absolute min-w-[120px] bg-neutral-800 p-3 border-2 rounded-lg text-center text-sm ${borderColor[color]}`}>{copied ? `${name} copiado` : `Copiar ${name}`}</div>}
            </div>
        </div>
    );
};