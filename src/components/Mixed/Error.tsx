import { FC, useEffect, useRef } from "react";
import * as icon from "react-icons/bs";
import { Button } from "./Button";

export const PopUpError: FC<{
    show: {
        show: boolean,
        message?: string
        title?: string;
    };
    setShow: (value: { show: boolean, message?: string }) => void;
}> = ({ show, setShow }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShow({ show: false });
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[6px] transition-opacity duration-300 text-white bg-black bg-opacity-50">
            <div ref={menuRef} className="bg-neutral-800 border-l-red-500 border-l-4 w-[500px] xl:w-[300px] p-4 rounded-lg shadow-md shadow-neutral-800">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-1 items-center">
                            <icon.BsX fill="#ff0000" size={30} />
                            <h1 className="text-lg font-bold">{show.title}</h1>
                        </div>
                        <span>{show.message}</span>
                    </div>
                    <div className="w-full flex items-center justify-end">
                        <Button clas="w-20" action={() => setShow({ show: false })}>Ok</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};