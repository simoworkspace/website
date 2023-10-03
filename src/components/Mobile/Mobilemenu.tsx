import { Link } from "react-router-dom";
import xIcon from "../../assets/svgs/x.svg";
import plusIcon from "../../assets/svgs/plus.svg";
import serversIcon from "../../assets/svgs/servers.svg";
import dotsIcon from "../../assets/svgs/dots.svg";
import React, { useContext, useState } from "react";
import { UserStructure } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import palleteIcon from "../../assets/svgs/pallete.svg";
import arrowIcon from "../../assets/svgs/arrow.svg";
import dashboardIcon from '../../assets/svgs/dashboard.svg';
import logoutIcon from '../../assets/svgs/logout.svg';
import api from "../../utils/api";
import { ChoiceColor } from "../Colors/Choice";
import { mobileMenu } from "../../utils/theme/mobileMenu";
import { MenuOption } from "../DropdownMenu/Option";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext<UserStructure | any>(UserContext);
    const { color } = useContext(ThemeContext);
    const [maisClick, setMaisClick] = useState<boolean>(false);
    const [themesClick, setThemesClick] = useState<boolean>(false);
    const selectedTheme = localStorage.getItem("theme") || "blue";

    console.log(maisClick, themesClick)

    return (
        <div className={`hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full border-t-2 transition-colors duration-300 ${mobileMenu[color]} xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center`}>
            {user ? (
                <>
                    <aside
                        className={`transition-all duration-300 absolute bg-black rounded border-2 left-0 bottom-[64px] ${
                            maisClick || themesClick
                                ? "visible opacity-100"
                                : "opacity-0 absolute hidden"
                            } ${themesClick
                                ? "h-[220px] w-[150px] visible opacity-100"
                                : maisClick ? "h-[130px] w-[160px] visible opacity-100" : "opacity-0 hidden"
                            }`}
                    >
                        <div
                            className={`flex w-full flex-col gap-2 items-center justify-center ${
                                themesClick
                                    ? "opacity-100 visible"
                                    : "opacity-0 hidden"
                                }`}
                        >
                            <button onClick={() => {setThemesClick(false); setMaisClick(true)}} className="hover:bg-neutral-700 flex flex-row items-center justify-center gap-2 rounded-lg w-[96%] h-[28px]">
                                <img className="w-[20px] rotate-90" src={arrowIcon} alt="Arrow Icon" />
                                <span>Menu</span>
                                <img src={dotsIcon} alt="Dots Icon"
                                />
                            </button>
                            <hr className="border-[1px] rounded-full w-[90%]" />
                            <ChoiceColor name="Vermelho" theme="red" margin="0px" mobile selected={selectedTheme === "red"} />
                            <ChoiceColor name="Azul" theme="blue" margin="0px" mobile selected={selectedTheme === "blue"} />
                            <ChoiceColor name="Roxo" theme="purple" margin="0px" mobile selected={selectedTheme === "purple"} />
                            <ChoiceColor name="Verde" theme="green" margin="0px" mobile selected={selectedTheme === "green"} />
                            <ChoiceColor name="Preto" theme="black" margin="0px" mobile selected={selectedTheme === "black"} />
                        </div>
                        <div
                            className={`flex w-full h-full flex-col transition-opacity duration-300 top-[4px] items-center justify-center  ${
                                themesClick || !maisClick
                                    ? "opacity-0 hidden"
                                    : "opacity-100 visible"
                                }`}
                        >
                            <div className={`${
                                maisClick ? "visible opacity-100" : "hidden opacity-0"
                            }`}>
                                <MenuOption alt="Pallete icon" icon={palleteIcon} title="Temas" type="button" action={() => {setThemesClick(!themesClick); setMaisClick(false)}} mobile/>
                                <MenuOption alt="Pallete icon" icon={dashboardIcon} title="Dashboard" type="link" to="/dashboard" mobile/>
                                <MenuOption alt="Logout Icon" icon={logoutIcon} title="Sair" type="button" action={async () => { await api.logoutUser(); return window.location.reload(); }} mobile/>
                            </div>
                        </div>
                    </aside>
                    <div className="flex flex-col items-center">
                        {!maisClick && !themesClick ? (
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => {
                                        setMaisClick(true);
                                    }}
                                >
                                    <img
                                        className="h-6 w-6 rounded-full"
                                        src={dotsIcon}
                                        alt="Dots Icon"
                                    />
                                </button>
                                <span className="text-xs">Mais</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => {
                                        setMaisClick(false);
                                        setThemesClick(false);
                                    }}
                                >
                                    <img
                                        className="h-6 w-6 rounded-full"
                                        src={xIcon}
                                        alt="Dots Icon"
                                    />
                                </button>
                                <span className="text-xs">Fechar</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <Link to="/addbot" className="text-white">
                            <img
                                src={plusIcon}
                                alt="Ícone 2"
                                className="h-6 w-6 text-white"
                            />
                        </Link>
                        <span className="text-xs">Adicionar bot</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link to="/" className="text-white">
                            <img
                                src={serversIcon}
                                alt="Ícone 3"
                                className="h-6 w-6 text-white"
                            />
                        </Link>
                        <span className="text-xs">Botlist</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button>
                            <img
                                className="h-6 w-6 text-white rounded-full"
                                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`}
                                alt="User Avatar"
                            />
                        </button>
                        <span className="text-xs">Perfil</span>
                    </div>
                </>
            ) : (
                <div className="w-[100vw] flex items-center justify-center">
                    <Link
                        className="w-[100%] self-center text-center text-white"
                        to={import.meta.env.VITE_AUTH_LINK}
                    >
                        login
                    </Link>
                </div>
            )}
        </div>
    );
};
