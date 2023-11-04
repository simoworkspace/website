import { FC, useEffect, useRef, useState } from "react";

export const PopUp: FC<{
    children: React.ReactNode;
    menu: boolean;
    setMenu: (value: boolean) => void;
}> = ({ children, menu, setMenu }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[6px] transition-opacity duration-300 text-white bg-black bg-opacity-50">
            <div ref={menuRef} className="bg-neutral-800 w-[500px] xl:w-[300px] rounded-lg shadow-md shadow-neutral-800">
                {children}
            </div>
        </div>
    );
};