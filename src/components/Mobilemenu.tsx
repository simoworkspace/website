import { Link } from "react-router-dom";
import searchIcon from "../assets/svgs/search.svg";
import plusIcon from "../assets/svgs/plus.svg";
import serversIcon from ".././assets/svgs/servers.svg";
import React, { useContext } from "react";
import { UserStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import api from "../api";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext<UserStructure | any>(UserContext);

    return (
        <div className="hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full xl:bg-gray-900 xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center">
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
                        <button
                            onClick={async () => {
                                await api.logoutUser();
                                return window.location.reload();
                            }}
                        >
                            <img
                                className="h-6 w-6 text-white rounded-full"
                                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`}
                                alt="User Avatar"
                            />
                        </button>
                        <span className="text-xs">Logout</span>
                    </div>
                </>
            ) : (
                <div className="w-[100vw] flex items-center justify-center">
                    <Link className="w-[100%] self-center text-center" to={import.meta.env.VITE_AUTH_LINK}>login</Link>
                </div>
            )}
        </div>
    );
};
