import { Link } from "react-router-dom";
import xIcon from "../assets/svgs/x.svg";
import plusIcon from "../assets/svgs/plus.svg";
import serversIcon from ".././assets/svgs/servers.svg";
import dotsIcon from "../assets/svgs/dots.svg";
import React, { useContext, useState } from "react";
import { UserStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { ThemeContextProps, Theme } from "../types";
import palleteIcon from "../assets/svgs/pallete.svg";
import arrowIcon from "../assets/svgs/arrow.svg";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext<UserStructure | any>(UserContext);
    const { color } = useContext(ThemeContext);
    const [maisClick, setMaisClick] = useState<boolean>(false);
    const [themesClick, setThemesClick] = useState<boolean>(false);
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return (
        <div
            className={`hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full border-t-2 ${
                color === "blue" && "bg-[#033757]"
            } ${color === "green" && "bg-[#056b49]"} ${
                color === "red" && "bg-[#571423]"
            } xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center`}
        >
            {user ? (
                <>
                    <aside
                        className={`w-[130px] transition-all duration-300 absolute bg-black rounded border-2 left-0 bottom-[64px] ${
                            maisClick
                                ? "visible opacity-100 absolute"
                                : "opacity-0 absolute invisible"
                        } ${
                            themesClick
                            ? "h-[150px]"
                            : "h-[120px]"
                        }`}
                    >
                        <div
                            className={`flex w-full h-full flex-col gap-2 items-center justify-center ${
                                themesClick
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible"
                            }`}
                        >
                            <button
                                onClick={() => {
                                    setThemesClick(false);
                                }}
                                className="hover:bg-neutral-700 flex flex-row items-center justify-center gap-2 rounded-lg"
                            >
                                <img
                                    className="w-[20px] rotate-90"
                                    src={arrowIcon}
                                    alt="Arrow Icon"
                                />
                                <span>Menu</span>
                                <img 
                                    src={dotsIcon} 
                                    alt="Dots Icon" 
                                />
                            </button>
                            <hr className="border-[1px] rounded-full w-[90%]" />
                            <button
                                onClick={() => {
                                    toggleTheme("red");
                                }}
                                className="hover:bg-[#3a3a3a] rounded-md transition-all w-full"
                            >
                                <div className="flex gap-2 flex-row items-center justify-center">
                                    <div className="w-3 h-3 bg-[#802222] rounded-full shadow-[#802222] shadow-2xl"></div>
                                    <div>Vermelho</div>
                                </div>
                            </button>
                            <button
                                onClick={() => {
                                    toggleTheme("blue");
                                }}
                                className="hover:bg-[#3a3a3a] rounded-md transition-all w-full"
                            >
                                <div className="flex gap-2 flex-row items-center justify-center">
                                    <div className="w-3 h-3 bg-[#004d7c] rounded-full shadow-[#004d7c] shadow-2xl"></div>
                                    <div>Azul</div>
                                </div>
                            </button>
                            <button
                                onClick={() => {
                                    toggleTheme("green");
                                }}
                                className="hover:bg-[#3a3a3a] rounded-md transition-all w-full"
                            >
                                <div className="flex gap-2 flex-row items-center justify-center">
                                    <div className="w-3 h-3 bg-[#04484d] rounded-full shadow-[#04484d] shadow-2xl"></div>
                                    <div>Verde</div>
                                </div>
                            </button>
                        </div>
                        <div
                            className={`flex w-full h-full flex-col transition-opacity duration-300 absolute bottom-[1px] ${
                                themesClick
                                    ? "opacity-0 invisible"
                                    : "opacity-100 visible"
                            }`}
                        >
                            <div className="flex gap-1 items-center justify-center">
                                <button
                                    onClick={() => {
                                        setThemesClick(true);
                                    }}
                                    className="hover:bg-neutral-700 flex flex-row items-center justify-center gap-2 rounded-lg"
                                >
                                    <img src={palleteIcon} alt="Pallete Icon" />
                                    <span>Themas</span>
                                    <img
                                        className="w-[20px] -rotate-90"
                                        src={arrowIcon}
                                        alt="Arrow Icon"
                                    />
                                </button>
                            </div>
                        </div>
                    </aside>
                    <div className="flex flex-col items-center">
                        {!maisClick ? (
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
                        <Link to="/addbot">
                            <img
                                src={plusIcon}
                                alt="Ícone 2"
                                className="h-6 w-6 text-white"
                            />
                        </Link>
                        <span className="text-xs">Adicionar bot</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link to="/">
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
                        className="w-[100%] self-center text-center"
                        to={import.meta.env.VITE_AUTH_LINK}
                    >
                        login
                    </Link>
                </div>
            )}
        </div>
    );
};
