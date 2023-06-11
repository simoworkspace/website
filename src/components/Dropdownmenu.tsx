import logoutIcon from "../assets/svg/logout.svg";
import plusIcon from "../assets/svg/plus.svg";
import dashIcon from "../assets/svg/dashboard.svg";
import listIcon from "../assets/svg/list.svg";
import serversIcon from "../assets/svg/servers.svg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import React from "react";

export const Dropdownmenu: React.FC = () => {
    const handleExit = (): void => {
        Cookies.remove("discordUser");
        window.location.reload();
    };

    return (
        <div>
            <div className="flex flex-col justify-center">
                <Link
                    to="/addbot"
                    className="p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img className="mr-3" src={plusIcon} alt="Plus Icon" />
                        <span>Adicionar bot</span>
                    </div>
                </Link>
                <Link
                    to="/"
                    className="p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img className="mr-3" src={listIcon} alt="List Icon" />
                        <span>Botlist</span>
                    </div>
                </Link>
                <Link
                    to="guilds"
                    className="p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img
                            className="mr-3 w-[20px]"
                            src={serversIcon}
                            alt="List Icon"
                        />
                        <span>Servidores</span>
                    </div>
                </Link>
                <Link
                    to="/dashboard"
                    className="p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img
                            className="mr-3"
                            src={dashIcon}
                            alt="Dashboard Icon"
                        />
                        <span>Dashboard</span>
                    </div>
                </Link>
                <button
                    onClick={handleExit}
                    className="p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img
                            className="mr-3"
                            src={logoutIcon}
                            alt="Logout Icon"
                        />
                        <span>Sair</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
