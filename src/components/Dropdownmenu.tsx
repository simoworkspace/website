import logoutIcon from "../assets/svgs/logout.svg";
import plusIcon from "../assets/svgs/plus.svg";
import dashIcon from "../assets/svgs/dashboard.svg";
import listIcon from "../assets/svgs/list.svg";
import serversIcon from "../assets/svgs/servers.svg";
import { Link } from "react-router-dom";
import React from "react";
import api from "../api";

export const Dropdownmenu: React.FC = () => {
    const handleExit = async () => {
        await api.logoutUser();
        return window.location.reload();
    };

    return (
        <div>
            <div className="flex flex-col justify-center">
                <Link
                    to="/addbot"
                    className="p-1 text-white hover:text-white hover:no-underline flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img className="mr-3" src={plusIcon} alt="Plus Icon" />
                        <span>Adicionar bot</span>
                    </div>
                </Link>
                <Link
                    to="/"
                    className="p-1 flex text-white hover:text-white hover:no-underline justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
                >
                    <div className="flex-2 flex">
                        <img className="mr-3" src={listIcon} alt="List Icon" />
                        <span>Botlist</span>
                    </div>
                </Link>
                <Link
                    to="guilds"
                    className="p-1 flex text-white hover:text-white hover:no-underline justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
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
                    className="p-1 flex text-white hover:text-white hover:no-underline justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
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
                    className="p-1 flex text-white hover:text-white hover:no-underline justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all"
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
