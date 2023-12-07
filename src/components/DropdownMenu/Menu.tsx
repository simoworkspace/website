import React, { useState, useContext, useRef, useEffect } from "react";
import * as iconMD from "react-icons/md";
import * as iconBS from "react-icons/bi";
import { UserContext } from "../../contexts/UserContext";
import { LoginButton } from "../Login/Login";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { ChoiceColor } from "../Colors/Choice";

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
                setThemeShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return user ? (
        <>
            <section className="xl:invisible" ref={menuRef}>
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setThemeShow(false);
                    }}
                    className={`${borderColor[color]} mr-10 xl:invisible bg-neutral-900 flex text-white border-2 p-2 gap-3 rounded-lg max-w-[600px] min-w-[165px] items-center justify-center`}
                >
                    <div className="h-[30px] w-[30px]">
                        <img src={`https://cdn.discordapp.com/avatars/${user?._id}/${user?.avatar}.png`} className="w-full h-full rounded-full" alt="Avatar" />
                    </div>
                    <div className="flex flex-reverse-row break-before-all items-center justify-center">
                        <span>{user.username}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} size={25} />
                    </div>
                </button>
                <div className={`${isOpen ? "opacity-100" : "opacity-0 invisible"} w-[155px] rounded-t-none border-t-0 text-white p-3 rounded-lg absolute right-[45px] origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                    <Link to="/addbot" className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-full">
                        <div className="flex w-full items-center justify-start gap-2">
                            <iconBS.BiPlus fill="#fff" size={20} />
                            <span>Addbot</span>
                        </div>
                    </Link>
                    <Link to="/dashboard" className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-full">
                        <div className="flex w-full items-center justify-start gap-2">
                            <iconBS.BiSolidDashboard fill="#fff" size={20} />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                    <button onClick={() => {
                        setThemeShow(!themeShow);
                        selected === "theme" ? setSelected("") : setSelected("theme");
                    }} className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-full">
                        <div className="flex w-full items-center justify-start gap-2">
                            <iconBS.BiPalette fill="#fff" size={20} />
                            <span>Temas</span>
                        </div>
                    </button>
                    <button onClick={async () => { await api.logoutUser(); return window.location.reload() }} className="flex flex-row items-center justify-center text-center gap-3 p-2 rounded-lg transition-colors duration-300 hover:bg-neutral-800 w-full">
                        <div className="flex w-full items-center justify-start gap-2">
                            <iconBS.BiExit fill="#fff" size={20} />
                            <span>Sair</span>
                        </div>
                    </button>
                </div>
            </section>
            <section className="xl:invisible" ref={themeRef}>
                <div className={`${themeShow ? "opacity-100" : "opacity-0 invisible"} flex-col flex text-white p-1 rounded-lg absolute right-[203px] top-[120px] origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                    <ChoiceColor name="Vermelho" theme="red" margin="6px" selected={selectedTheme === "red"} />
                    <ChoiceColor name="Azul" theme="blue" margin="6px" selected={selectedTheme === "blue"} />
                    <ChoiceColor name="Roxo" theme="purple" margin="6px" selected={selectedTheme === "purple"} />
                    <ChoiceColor name="Verde" theme="green" margin="6px" selected={selectedTheme === "green"} />
                    <ChoiceColor name="Preto" theme="black" margin="6px" selected={selectedTheme === "black"} />
                </div>
            </section>
        </>
    ) : (
        <LoginButton />
    )
};
