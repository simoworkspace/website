import React, { useState, useContext, useRef, useEffect } from "react";
import * as iconMD from "react-icons/md";
import * as iconBS from "react-icons/bi";
import { UserContext } from "../../contexts/UserContext";
import { Disclosure } from "@headlessui/react";
import { LoginButton } from "../Login/Login";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { Link } from "react-router-dom";
import api from "../../utils/api";

export const LoggedMenu: React.FC = () => {
    const { user } = useContext(UserContext);
    const { color } = useContext(ThemeContext);

    const selectedTheme = localStorage.getItem("theme") || "purple";
    const [themeShow, setThemeShow] = useState<boolean>();

    const [selected, setSelected] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const themeRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return user ? (
        <>
            <section ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className={`${borderColor[color]} xl:invisible bg-neutral-900 flex text-white border-2 p-2 gap-3 rounded-lg max-w-[600px] items-center justify-center`}
                >
                    <div className="h-[30px] w-[30px]">
                        <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} className="w-full h-full rounded-full" alt="Avatar" />
                    </div>
                    <div className="flex flex-reverse-row break-before-all items-center justify-center">
                        <span>{user.username}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} size={25} />
                    </div>
                </button>
                <Disclosure as="div" className={`${isOpen ? "opacity-100" : "opacity-0 invisible"} rounded-t-none border-t-0 text-white p-3 rounded-lg absolute right-1 origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                    <Link to="/addbot" className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-[100px]">
                        <div className="flex justify-start">
                            <iconBS.BiPlus fill="#fff" size={20} />
                        </div>
                        <div>
                            <span>Addbot</span>
                        </div>
                    </Link>
                    <hr className="my-1" />
                    <button onClick={() => {
                        setThemeShow(!themeShow);
                        selected === "theme" ? setSelected("") : setSelected("theme");
                    }} className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-[100px]">
                        <div className="flex justify-start">
                            <iconBS.BiPalette fill="#fff" size={20} />
                        </div>
                        <div>
                            <span>Temas</span>
                        </div>
                    </button>
                    <hr className="my-1" />
                    <button onClick={async () => { await api.logoutUser(); return window.location.reload() }} className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-[100px]">
                        <div className="flex justify-start w-[30%]">
                            <iconBS.BiExit fill="#fff" size={20} />
                        </div>
                        <div className="flex justify-start w-[70%]">
                            <span>Sair</span>
                        </div>
                    </button>
                </Disclosure>
            </section>
            <section ref={themeRef}>
                <Disclosure as="div" className={`${themeShow ? "opacity-100" : "opacity-0 invisible"} text-white p-3 rounded-lg absolute right-1 origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                    
                </Disclosure>
            </section>
        </>
    ) : (
        <LoginButton />
    )
};
