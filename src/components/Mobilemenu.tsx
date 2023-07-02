import { Link } from "react-router-dom";
import searchIcon from "../assets/svgs/search.svg";
import plusIcon from "../assets/svgs/plus.svg";
import serversIcon from ".././assets/svgs/servers.svg";
import dotsIcon from '../assets/svgs/dots.svg';
import React, { useContext } from "react";
import { UserStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import api from "../api";
import { ThemeContext } from "../contexts/ThemeContext";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext<UserStructure | any>(UserContext);
    const { color } = useContext(ThemeContext);

    return (
        <div
            className={`hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full rounded-t-lg border-t-2 ${
                color === "blue" && "bg-[#033757]"
            } ${color === "green" && "bg-[#056b49]"} ${
                color === "red" && "bg-[#571423]"
            } xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center`}
        >
            {user ? (
                <>
                    <div className="flex flex-col items-center">
                        <Link to="/">
                            <img
                                src={searchIcon}
                                alt="Ícone 1"
                                className="h-6 w-6 text-white"
                            />
                        </Link>
                        <span className="text-xs">Procurar bot</span>
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
                        <span className="text-xs">Servidores</span>
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
                    <div className="flex flex-col items-center">
                        <button>
                            <img
                                className="h-6 w-6 text-white rounded-full"
                                src={dotsIcon}
                                alt="Dots Icon"
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
