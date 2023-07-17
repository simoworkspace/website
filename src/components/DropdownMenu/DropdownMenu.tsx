import logoutIcon from "../../assets/svgs/logout.svg";
import plusIcon from "../../assets/svgs/plus.svg";
import dashIcon from "../../assets/svgs/dashboard.svg";
import listIcon from "../../assets/svgs/list.svg";
import React from "react";
import api from "../../utils/api";
import { MenuOption } from "./Option";

export const Dropdownmenu: React.FC = () => {
    return (
        <div className="flex w-[151px] justify-center items-center">
            <div className="flex flex-col justify-center">
                <MenuOption to="/addbot" alt="Plus Icon" icon={plusIcon} title="Adicionar bot" type="link" />
                <MenuOption to="/" alt="List Icon" icon={listIcon} title="Botlist" type="link" fix />
                <MenuOption to="/dashboard" alt="Dashboard Icon" icon={dashIcon} title="Dashboard" type="link" fix />
                <MenuOption alt="Logout Icon" icon={logoutIcon} title="Sair" type="button" action={async () => { await api.logoutUser(); return window.location.reload(); }} fix />
            </div>
        </div>
    );
};
